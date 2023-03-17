using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace anotherCalendarBe.Migrations
{
    /// <inheritdoc />
    public partial class SeedAppConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "production",
                table: "AppConfig");

            migrationBuilder.AlterColumn<Guid>(
                name: "_id",
                table: "AppConfig",
                type: "char(36)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)");

            migrationBuilder.InsertData(
                table: "AppConfig",
                columns: new[] { "_id", "version" },
                values: new object[] { new Guid("648daff3-5940-400a-8f80-f9b8a2504241"), "0.0.1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AppConfig",
                keyColumn: "_id",
                keyValue: new Guid("648daff3-5940-400a-8f80-f9b8a2504241"));

            migrationBuilder.AlterColumn<string>(
                name: "_id",
                table: "AppConfig",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "char(36)");

            migrationBuilder.AddColumn<bool>(
                name: "production",
                table: "AppConfig",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
