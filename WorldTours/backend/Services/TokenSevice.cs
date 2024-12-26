using backend.Configurations;
using backend.Models.Entity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace backend.Services
{
    public class TokenSevice
    {
        public static string GenerateToken(string email, UserRole role)
        {
            List<Claim> claims = new List<Claim> { new Claim(ClaimTypes.Email, email), new Claim(ClaimTypes.Role, role.ToString()) };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromHours(8)), // время действия 8 часов
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
