const {createShortUrl, getShortUrl } = require('../services/shortUrlsService');

const { v4: uuidv4 } = require('uuid');

exports.store = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== 'string') {
        return res.status(400).json({ error: 'Invalid URL format.'});
    }

    const shortCode = uuidv4().slice(0, 8);

    try {
        const shortUrl = await createShortUrl({ originalUrl, shortCode });

        res.status(201).json({
            message: 'Short URL created successfully',
            shortUrl: {
                originalUrl: shortUrl.originalUrl,
                shortCode: shortUrl.shortCode,
                createdAt: shortUrl.createdAt
            }
        });
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Could not create short URL' });
    }
};

exports.show = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const shortUrl = await getShortUrl(shortCode);

        if (!shortUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.redirect(shortUrl.originalUrl);
    } catch (error) {
        console.error('Error retrieving short URL:', error);
        res.status(500).json({ error: 'Could not retrieve short URL' });
    }
};