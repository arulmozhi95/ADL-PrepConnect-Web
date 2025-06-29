from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Experience(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20)
    department = models.CharField(max_length=10, choices=[("CSE", "CSE"), ("IT", "IT"), ("AIML", "AI & ML")])
    company_name = models.CharField(max_length=255)
    year = models.IntegerField(choices=[(2022, "2022"), (2023, "2023"), (2024, "2024"), (2025, "2025")])
    job_type = models.CharField(max_length=10, choices=[("Internship", "Internship"), ("Fulltime", "Fulltime")])
    file = models.FileField(upload_to="experience_files/")

    def __str__(self):
        return f"{self.name} - {self.company_name} ({self.year})"
#for login signup
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    # Add related_name to resolve conflicts
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',  # Custom related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',  # Custom related_name
        blank=True
    )

    def __str__(self):
        return self.email
