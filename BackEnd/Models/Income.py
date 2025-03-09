from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    date = models.DateField()
    description = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, related_name="%(class)ss", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # This makes it a base class (not a table in DB)

    def __str__(self):
        return f"{self.date} - {self.description}: {self.amount} ({self.owner})"


class Income(Transaction):
    class IncomeCategory(models.TextChoices):
        SALARY = "Salary", "Salary"
        ALLOWANCE = "Allowance", "Allowance"
        GIFT = "Gift", "Gift"
        PASSIVE = "Passive", "Passive"
        OTHER = "Other", "Other"

    category = models.CharField(
        max_length=32,
        choices=IncomeCategory.choices,
        null=True,  # Can be left blank
        blank=True
    )


class Expense(Transaction):
    class ExpenseCategory(models.TextChoices):
        FOOD = "Food", "Food"
        TRANSPORT = "Transport", "Transport"
        RENT = "Rent", "Rent"
        ENTERTAINMENT = "Entertainment", "Entertainment"
        OTHER = "Other", "Other"

    category = models.CharField(
        max_length=32,
        choices=ExpenseCategory.choices,
        null=True,  # Can be left blank
        blank=True
    )
