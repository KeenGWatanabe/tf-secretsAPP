const mongoose = require('mongoose')

////We will fetch credentials from AWS Secretst Manager dynamically//////////////
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager({region: 'ap-southeast-1'});

const getSecretValue = async (secretName) => {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    }
    return {};
  } catch (error) {
    console.error('❌ Error retrieving secret:', error);
    throw error;
  }
};
const connectDB = async () => {
  try {
    console.log('🔍 Fetching DB credentials from Secrets Manager...');
    const secretData = await getSecretValue('code/mongodb_uri'); // Replace with your secret ARN or name
    const MONGODB_URI = secretData.MONGODB_URI;

    if (!MONGODB_URI || !MONGODB_URI.startsWith('mongodb')) {
      throw new Error('❌ Invalid MONGODB_URI retrieved from Secrets Manager');
    }

    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB connection established');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

module.exports = connectDB