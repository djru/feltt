const mysql = require('mysql2/promise');
var uniqid = require('uniqid');
const {db_addr, db_user, db_password} = require('./constants')
const pool = mysql.createPool({
  host     : db_addr,
  user     : db_user,
  password : db_password,
  database: 'feltt',
  // ssl: 'Amazon RDS',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

    
const get_user_by_email = async (email) => {
  const [results, fields] = await pool.query(`select * from users where email = ? limit 1`, [email])
  if(results.length){return results[0]}
  else{return null}
};

const get_user_by_id = async (id) => {
  const [results, fields] = await pool.query(`select * from users where id = ? limit 1`, [id])
  if(results.length){return results[0]}
  else{return null}
};

const create_user = async (email) => {
    const [results, fields] = await pool.query(`insert into users set ?`, {email, uname: uniqid()})
    console.log(results)
    if(results && results.insertId){
      const user = await get_user_by_id(results.insertId)
      console.log(user)
      return user
    }
    else{
      return null
    }
};

const insert_post = async (post_data) => {
  const [results, fields] = await pool.query(`insert into posts set ?`, post_data)
  if(results && results.insertId){
    const post = await get_post_by_id(results.insertId)
    return post
  }
  else{
    return null
  }
};

const insert_record_for_table = async (data, table) => {
  const [results, fields] = await pool.query(`insert into ${table} set ?`, data)
  if(results && results.insertId){
    const post = await get_record_by_id_for_table(results.insertId, table)
    return post
  }
  else{
    return null
  }
};

const get_post_by_id = async (id) => {
  const [results, fields] = await pool.query(`select * from posts where id = ? limit 1`, [id])
  if(results.length){return results[0]}
  else{return null}
}

const get_record_by_id_for_table = async (id, table) => {
  const [results, fields] = await pool.query(`select * from ${table} where id = ? limit 1`, [id])
  if(results.length){return results[0]}
  else{return null}
}
module.exports = {create_user, get_user_by_email, insert_post, insert_record_for_table}