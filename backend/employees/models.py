from django.db import models
from PIL import Image

class Employee(models.Model):
    name            = models.CharField(max_length=50)
    email           = models.EmailField(max_length=50)
    mobile          = models.CharField(max_length=15)
    date_of_birth   = models.DateField()
    photo           = models.ImageField(upload_to = 'photos/')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.photo.path)
        
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.photo.path)

    def __str__(self):
        return self.name 
    
    