import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('services', (table) => {
    table.increments('id').primary();
    table.string('service').notNullable();
    table.string('price').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('services');
}
