# Generated by Django 5.0.3 on 2024-04-17 21:14

import django.contrib.postgres.fields
from django.db import migrations, models

def load_data(apps, schema_editor):
    # Read SQL insert statements from file
    with open('inserts.sql') as f:
        sql_statements = f.read()

    # Execute SQL insert statements
    with schema_editor.connection.cursor() as cursor:
        cursor.execute(sql_statements)

class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SampleRecipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('snum', models.IntegerField()),
                ('name', models.CharField(max_length=1000)),
                ('recipe_id', models.CharField(max_length=100)),
                ('minutes', models.IntegerField()),
                ('tags', models.CharField(max_length=10000)),
                ('nutrition', django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(default=0), size=None)),
                ('n_steps', models.IntegerField()),
                ('steps', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10000), size=None)),
                ('description', models.CharField(max_length=10000)),
                ('ingredients', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10000), size=None)),
                ('n_ingredients', models.IntegerField()),
                ('image_url', models.CharField(max_length=1000)),
            ],
        ),
        migrations.RunSQL(sql='', reverse_sql=''),
        migrations.RunPython(load_data),
    ]
