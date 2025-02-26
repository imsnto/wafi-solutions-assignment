# Generated by Django 5.1.1 on 2024-09-12 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50)),
                ('mobile', models.CharField(max_length=15)),
                ('date_of_birth', models.DateField()),
                ('photo', models.ImageField(upload_to='photos/')),
            ],
        ),
    ]
