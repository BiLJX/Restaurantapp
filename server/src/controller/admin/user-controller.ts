import { Employees } from "../../models/Employee";
import { makeId } from "../../utils/idgen";
import { removeFile, upload, uploadFile } from "../../utils/upload";
import sharp from "sharp";
import { Controller } from "../../types/controller";
import JsonResponse from "../../utils/Response";
import bcrypt from "bcrypt";
import { validateContactNo, validateEmail, validateFullName, validateGender, validatePassowrd, validateRoles } from "../../utils/validator";
export const getCurrentAdmin: Controller = (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        jsonResponse.success(res.locals.admin);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const createEmployee: Controller = (req, res) => {
    const { restaurant_id } = res.locals.admin;
    upload(req, res, async err => {
        const jsonResponse = new JsonResponse(res);
        try {
            if(err){
                console.log(err);
                return jsonResponse.serverError();
            }
            const datas = req.body;
            const files = req.files as Express.Multer.File[];
            const pfp_image = files[0];
            if(!pfp_image) return jsonResponse.clientError("Please upload a profile picture");
            const user_id = makeId();
            if(!pfp_image.mimetype.includes("image")) return jsonResponse.clientError("Invalid image type.");
            const nameValidation = validateFullName(datas.full_name);
            const emailValidation = validateEmail(datas.email);
            const genderValidation = validateGender(datas.gender);
            const passwordValidation = validatePassowrd(datas.password);
            datas.contact_no = parseInt(datas.contact_no);
            const contact_noValidation = validateContactNo(datas.contact_no);
            const roleValidation = validateRoles(datas.role);
            
            if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
            if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
            if(!genderValidation.success) return jsonResponse.clientError(genderValidation.message);
            if(!passwordValidation.success) return jsonResponse.clientError(passwordValidation.message);
            if(!contact_noValidation.success) return jsonResponse.clientError(contact_noValidation.message);
            if(!roleValidation.success) return jsonResponse.clientError(roleValidation.message);

            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(datas.password, salt);
            const employee = new Employees({
                ...datas,
                user_id,
                restaurant_id,
                profile_pic_url: "",
                password
            })
            const buffer = await sharp(pfp_image.buffer).jpeg({quality: 90}).toBuffer();
            const image_url = await uploadFile({buffer, dir: `restaurant/${restaurant_id}/user/${user_id}/pfp/${user_id}/`});
            employee.profile_pic_url = image_url
            const data = await employee.save();
            const _data: any = data.toJSON();
            delete _data.password;
            jsonResponse.success(_data);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
}

export const retrieveEmployee: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    const search_query = req.query.search_query;
    try {
        const matchCreate = () => {
            if(search_query) return ({
                $match: {
                    restaurant_id,
                    full_name: {$regex: search_query, $options: "i"}
                }
            })
            return ({
                $match: {
                    restaurant_id
                }
            })
        }
        const employees = await Employees.aggregate([
            matchCreate(),
            {
                $project: {
                    password: 0
                }
            }
        ])
        jsonResponse.success(employees)
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    } 
}

export const retrieveEmployeeById: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    try {
        const { id } = req.params;
        const employee = await Employees.aggregate([
            {
                $match: {
                    restaurant_id,
                    user_id: id
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ])
        if(!employee[0]) return jsonResponse.notFound("Employee not found");
        jsonResponse.success(employee[0])
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}

export const editEmployee: Controller = (req, res) => {
    const { restaurant_id } = res.locals.admin;
    upload(req, res, async err => {
        const jsonResponse = new JsonResponse(res);
        try {
            if(err){
                console.log(err);
                return jsonResponse.serverError();
            }
            const datas = req.body;
            const files = req.files as Express.Multer.File[];
            const pfp_image = files[0];
            datas.contact_no = parseInt(datas.contact_no);
            const nameValidation = validateFullName(datas.full_name);
            const emailValidation = validateEmail(datas.email);
            const genderValidation = validateGender(datas.gender);
            const contact_noValidation = validateContactNo(datas.contact_no);
            const roleValidation = validateRoles(datas.role);
            if(!nameValidation.success) return jsonResponse.clientError(nameValidation.message);
            if(!emailValidation.success) return jsonResponse.clientError(emailValidation.message);
            if(!genderValidation.success) return jsonResponse.clientError(genderValidation.message);
            if(!contact_noValidation.success) return jsonResponse.clientError(contact_noValidation.message);
            if(!roleValidation.success) return jsonResponse.clientError(roleValidation.message);
            
            let employee = await Employees.findOneAndUpdate({user_id: datas.user_id, restaurant_id}, {
                $set: {
                    ...datas
                }
            })
            if(!employee) return jsonResponse.clientError("User not found");
            if(pfp_image){
                if(!pfp_image.mimetype.includes("image")) return jsonResponse.clientError("Invalid image type.");
                const buffer = await sharp(pfp_image.buffer).jpeg({quality: 90}).toBuffer();
                const image_url = await uploadFile({buffer, dir: `restaurant/${restaurant_id}/user/${datas.user_id}/pfp/${datas.user_id}/`});
                employee = await Employees.findOneAndUpdate({user_id: datas.user_id, restaurant_id}, {
                    $set: {
                        profile_pic_url: image_url
                    }
                })
            }
            const _employee: any = employee?.toJSON();
            delete _employee.password;
            jsonResponse.success(_employee);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError();
        }
    })
}

export const deleteEmployee: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const { restaurant_id } = res.locals.admin;
    const { id } = req.params;
    try {
        await Employees.findOneAndDelete({restaurant_id, user_id: id});
        await removeFile(`restaurant/${restaurant_id}/user/${id}/`)
        jsonResponse.success()
    } catch (error) {
        console.log(error);
            jsonResponse.serverError();
    }
}