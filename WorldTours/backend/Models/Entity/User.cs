﻿using System.ComponentModel.DataAnnotations;
using backend.Models.DTOs;

namespace backend.Models.Entity
{
    public enum UserRole
    {
        GUEST,
        USER,
        MANAGER,
        ADMIN
    }
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public bool BlockedStatus { get; set; } = false;

        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string Surname { get; set; }

        [MaxLength(255)]
        public string PhoneNumber { get; set; }

        public byte[]? Photo { get; set; }

        public User(int id, string email, string password, UserRole role, string name, string surname, string phoneNumber)
        {
            Id = id;
            Email = email;
            Password = password;
            Role = role;
            Name = name;
            Surname = surname;
            PhoneNumber = phoneNumber;
        }
        public User(RegisterModelDto register, UserRole role = UserRole.USER)
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