namespace backend.Models
{
    public enum UserRole
    {
        GUEST,
        USER,
        MANAGER,
        ADMIN
    }
    public class UserModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }

        public UserModel(int id, string email, string password, UserRole role, string name, string surname, string phoneNumber)
        {
            Id = id;
            Email = email;
            Password = password;
            Role = role;
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
        }
        public UserModel(RegisterModel register, UserRole role=UserRole.USER)
        {
            Email = register.Email;
            Password = register.Password;
            Name = register.Name;
            Surname = register.Surname;
            PhoneNumber = register.PhoneNumber;
            Role = role;
        }
    }
}
