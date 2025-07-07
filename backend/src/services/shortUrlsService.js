const { PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const dynamoDB = require('../config/dynamo');


const table = process.env.DYNAMODB_TABLE || 'ShortUrls';

async function createShortUrl({ originalUrl, shortCode}){
    const shortUrl = {
        originalUrl,
        shortCode,
        createdAt: new Date().toISOString(),
    };

    const params = {
        TableName: table,
        Item: shortUrl,
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        return shortUrl;
    } catch (error) {
        console.error('Error creating short URL:', error);
        throw new Error('Could not create short URL');
    }
    
}

async function getShortUrl(shortCode) {
    const params = {
        TableName: table,
        Key: { shortCode },
    };

    try {
        const result = await dynamoDB.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        console.error('Error retrieving short URL:', error);
        throw new Error('Could not retrieve short URL');
    }
}

module.exports = {
    createShortUrl,
    getShortUrl,
};