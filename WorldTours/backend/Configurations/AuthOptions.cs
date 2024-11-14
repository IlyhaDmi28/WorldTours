using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend.Configurations
{
    public class AuthOptions
    {
        public const string ISSUER = "WorldToursServer"; // издатель токена
        public const string AUDIENCE = "WorldToursClient"; // потребитель токена
        const string KEY = "ILYHA_SECRET_KEY1029384756qwerty";   // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
