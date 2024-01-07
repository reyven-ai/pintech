import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pins", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("user_id").inTable("users");
    table.text("description");
    table.string("image_url");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pins");
}
