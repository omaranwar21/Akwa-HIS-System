const db = require("../mysql-con");

module.exports = {
  //get all Department
  getAllDepartments: (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    db.query(`SELECT * FROM dep`, (err, result) => {
      if (err) return res.status(400).send(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Not Found" });
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
    });
  },

  //get one Department
  getOneDepartment: (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM dep WHERE id = ?`, id, (err, result) => {
      if (err) return res.status(400).send(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Not Found" });
      res.status(200).json(result[0]);
    });
  },

  //add Department
  createDepartment: (req, res) => {
    const { id, name, create_time, update_time } = req.body;
    const departmentData = {
      id,
      name,
      create_time,
      update_time,
    };
    db.query(`INSERT INTO dep SET ?`, departmentData, (err, result) => {
      if (err) return res.status(400).send(err);
      console.log(result);
      res.status(201).json({ message: "Department added successfully" });
    });
  },

  //update Department
  updateDepartment: (req, res) => {
    const id = req.params.id;
    db.query(`UPDATE dep SET ? WHERE id = ?`, [req.body, id], (err, result) => {
      if (err) return res.status(400).send(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Not Found" });
      res.status(200).json({ message: "Department edited successfully" });
    });
  },

  //delete Department
  deleteDepartment: (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM dep WHERE id = ?`, id, (err, result) => {
      if (err) return res.status(400).send(err);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Not Found" });
      res.status(200).json({ message: "Department deleted successfully" });
    });
  },
};
