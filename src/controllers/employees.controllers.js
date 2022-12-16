import { pool } from "../db.js";
export const getEmployees=async(req,res)=>{
    try{
        // throw new Error("DB Error")
        const [rows]=await pool.query("Select * from employees");
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}
export const createEmployees=async(req,res)=>{
    const {name,salary}=req.body
    try{
        // throw new Error("DB Error")
        const [rows]=await pool.query("insert into employees(name,salary) values(?,?)",[name,salary]);
        res.send({
            id:rows.insertId,
            name,
            salary,
        });
    }catch(error){
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}
export const getEmployee=async(req,res)=>{
    const id= req.params.id
    try{
        const [rows]=await pool.query("Select * from employees where id=?",[id]);
        if(rows.length<=0) return res.status(404).json({
            message:"Employee not found"
        })
        res.send(rows[0]);  
    }catch(error){
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}
export const updateEmployees=async(req,res)=>{
    const {id}= req.params;
    const {name,salary}=req.body;
    try{
        const [result]= await pool.query("Update employees set name=?, salary=? where id=?",[name,salary,id]);
        if(result.affectedRows<=0)return res.status(404).json({
            message:"Employee not found"
        })
        const [rows]=await pool.query("Select * from employees where id=?",[id]);
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}
export const deleteEmployees=async(req,res)=>{
    try{
        const [result]= await pool.query("Delete from employees where id= ?",[req.params.id]);
        if(result.affectedRows<=0) return res.status(404).json({
            message:"Employee didn't find"
        });
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}
export const patchEmployees=async(req,res)=>{
    const {id}=req.params;
    const {name,salary}= req.body;
    try{
        const [result] = await pool.query("Update employees set name= IFNULL(?, name), salary= IFNULL(?, salary) where id= ?",[name,salary,id])
        if(result.affectedRows<=0)return res.status(404).json({
            message:"Employee didn't find"
        })
        const [rows]= await pool.query("select * from employees where id=?",[id]);
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}