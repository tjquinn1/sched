# Generated by Django 2.0 on 2018-04-16 01:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employee', '0001_initial'),
        ('locations', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(null=True)),
                ('start_time', models.IntegerField(default=0)),
                ('end_time', models.IntegerField(default=0)),
                ('emp', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='employee.Emp')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='locations.Location')),
            ],
        ),
    ]
