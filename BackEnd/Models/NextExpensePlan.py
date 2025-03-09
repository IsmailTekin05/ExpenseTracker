from django.db import models

class NextExpensePlan(models.Model):
    date = models.DateField()
    isSuccessful = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.date} : {self.amount}"