'use strict'
const shortid = require('shortid')
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('employees').del(),
    knex('employees').insert({
        ref_code: shortid.generate(),
        first_name: "Tremaine",
        middle_name: "Brown",
        last_name: "Buchanan",
        dob: "2015-10-25",
        gender: "M",
        hire_date: "2015-10-25"
    }),
    knex('employees').insert({
          ref_code: shortid.generate(),
          first_name: "Bruce",
          middle_name: "Junior",
          last_name: "Wayne",
          dob: "2015-10-25",
          gender: "M",
          hire_date: "2015-10-25"
    })
  );
};
