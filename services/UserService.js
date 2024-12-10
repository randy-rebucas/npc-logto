const sharetribeSdk = require('sharetribe-flex-sdk');

class UserService {
  constructor() {
    this.sdk = sharetribeSdk.createInstance({
      clientId: process.env.SHARETRIBE_CLIENT_ID,
      clientSecret: process.env.SHARETRIBE_CLIENT_SECRET
    });
  }

  async createUser(userData) {
    try {
      const user = await this.sdk.currentUser.create({
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
        bio: userData.bio,
        publicData: {
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          // Add any other public fields you need
        },
        privateData: userData.privateData || {},
        protectedData: userData.protectedData || {}
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      const response = await this.sdk.users.show({
        id: userId,
        include: ['profileImage']
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user ${userId}: ${error.message}`);
    }
  }

  async updateUser(userId, updateData) {
    try {
      const response = await this.sdk.users.update({
        id: userId,
        ...updateData
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user ${userId}: ${error.message}`);
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.sdk.currentUser.show({
        include: ['profileImage']
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current user: ${error.message}`);
    }
  }

  async searchUsers(params = {}) {
    try {
      const { 
        page = 1, 
        perPage = 20, 
        filters = {} 
      } = params;

      const response = await this.sdk.users.query({
        ...filters,
        include: ['profileImage'],
        page,
        perPage
      });

      return {
        users: response.data,
        pagination: {
          page,
          perPage,
          totalItems: response.meta.totalItems,
          totalPages: response.meta.totalPages
        }
      };
    } catch (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }
  }

  async uploadProfileImage(userId, imageFile) {
    try {
      const response = await this.sdk.images.upload({
        image: imageFile,
        relationshipType: 'user',
        relationshipId: userId
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to upload profile image: ${error.message}`);
    }
  }

  async verifyEmail(token) {
    try {
      const response = await this.sdk.currentUser.verifyEmail({
        verificationToken: token
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to verify email: ${error.message}`);
    }
  }

  async requestPasswordReset(email) {
    try {
      await this.sdk.passwordReset.request({ email });
      return true;
    } catch (error) {
      throw new Error(`Failed to request password reset: ${error.message}`);
    }
  }

  async resetPassword(token, newPassword) {
    try {
      await this.sdk.passwordReset.reset({
        token,
        password: newPassword
      });
      return true;
    } catch (error) {
      throw new Error(`Failed to reset password: ${error.message}`);
    }
  }
}

module.exports = new UserService();