import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('schedule', (table) => {
    table.increments('id').primary();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    table.integer('week_day').notNullable();
    table
      .integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');

    table
      .integer('service_id')
      .references('services.id')
      .notNullable()
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('schedule');
}
