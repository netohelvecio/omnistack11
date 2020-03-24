exports.up = (knex) => {
  return knex.schema.createTable('ongs', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.integer('cep', 8).notNullable();
    table.string('city').notNullable();
    table.string('neighborhood').notNullable();
    table.string('uf', 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('ongs');
};
