# Generated by Django 5.1.6 on 2025-03-03 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ToDo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('age', models.IntegerField()),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='Completed',
            new_name='completed',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='Description',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='Title',
            new_name='title',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='Date',
        ),
        migrations.AddField(
            model_name='todo',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
