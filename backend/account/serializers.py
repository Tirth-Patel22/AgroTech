# from rest_framework import serializers
# from .models import Account

# class AccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Account
#         fields = '__all__'

from rest_framework import serializers
from .models import Account,ContactMessage,AdminDetails

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        account = Account(**validated_data)
        account.set_password(password)
        return account
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        account = Account(**validated_data)
        account.set_password(password)
        account.save()  # 🔴 add this
        return account

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message']


# admin
class AdminDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminDetails
        fields = ['id', 'name', 'email', 'phone_number','password']

# account

class AccountProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "username", "email"]

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)