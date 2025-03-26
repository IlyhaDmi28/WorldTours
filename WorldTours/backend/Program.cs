using backend;
using backend.Configurations;
using backend.Controllers;
using backend.DB;
using backend.Models.Entity;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ��������� �������� AppDbContex � �������� ������� � ����������
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(11, 5, 2)) //������������ ������ MariaDB
    )
);

builder.Services.AddScoped<IPaymentService, PaymentService>();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
            builder =>
            {
				builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
						.AllowAnyMethod()
						.AllowAnyHeader()
						.AllowCredentials();
			}
    );
});// ���������, ����� �� �������������� �������� ��� ��������� ������


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {

            ValidateIssuer = true,
            // ������, �������������� ��������
            ValidIssuer = AuthOptions.ISSUER,
            // ����� �� �������������� ����������� ������
            ValidateAudience = true,
            // ��������� ����������� ������
            ValidAudience = AuthOptions.AUDIENCE,
            // ����� �� �������������� ����� �������������
            ValidateLifetime = true,
            // ��������� ����� ������������
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // ��������� ����� ������������
            ValidateIssuerSigningKey = true,
		};
	});

builder.Services.Configure<FormOptions>(options =>
{
	options.MultipartBodyLengthLimit = 100 * 1024 * 1024; // ��������� ����� (50MB)
});

builder.Services.AddAuthorization();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions
{
	OnPrepareResponse = ctx =>
	{
		ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
	}
});
app.UseCors("AllowSpecificOrigins");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Fallback ��� ��������� React SPA
app.MapFallbackToFile("index.html");

// �������� ������������
app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
