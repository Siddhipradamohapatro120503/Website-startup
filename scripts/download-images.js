const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrls = {
    // Hero Banners
    'hero-banner.jpg': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    'hero-banner-2.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    'hero-banner-3.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    
    // Service Section Images
    'service1.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'service2.jpg': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    'service3.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692',
    'service4.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    'service5.jpg': 'https://images.unsplash.com/photo-1573164713988-8665fc963095',
    'service6.jpg': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
    
    // Feature Section Images
    'feature1.jpg': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'feature2.jpg': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'feature3.jpg': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'feature4.jpg': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
    'feature5.jpg': 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2',
    
    // Team Images
    'team1.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    'team2.jpg': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    'team3.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    'team4.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    
    // Technology Icons
    'tech1.png': 'https://via.placeholder.com/150x150?text=AI+Tech',
    'tech2.png': 'https://via.placeholder.com/150x150?text=Cloud',
    'tech3.png': 'https://via.placeholder.com/150x150?text=Security',
    'tech4.png': 'https://via.placeholder.com/150x150?text=Data',
    
    // Partner Logos
    'partner1.png': 'https://via.placeholder.com/200x60?text=Microsoft',
    'partner2.png': 'https://via.placeholder.com/200x60?text=Google',
    'partner3.png': 'https://via.placeholder.com/200x60?text=Amazon',
    'partner4.png': 'https://via.placeholder.com/200x60?text=IBM',
    'partner5.png': 'https://via.placeholder.com/200x60?text=Oracle',
    'partner6.png': 'https://via.placeholder.com/200x60?text=Intel',
    
    // About Section Images
    'about1.jpg': 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
    'about2.jpg': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    'about3.jpg': 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    
    // Case Study Images
    'case1.jpg': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    'case2.jpg': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'case3.jpg': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
    
    // Blog/News Images
    'blog1.jpg': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'blog2.jpg': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
    'blog3.jpg': 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2',
    
    // Contact Section Images
    'contact1.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'contact2.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    
    // Background Patterns
    'pattern1.jpg': 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3',
    'pattern2.jpg': 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7'
};

const downloadImage = (url, filename) => {
    const imagePath = path.join(__dirname, '..', 'public', 'image', filename);
    
    https.get(url, (response) => {
        const fileStream = fs.createWriteStream(imagePath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${filename}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}:`, err.message);
    });
};

// Create image directory if it doesn't exist
const imageDir = path.join(__dirname, '..', 'public', 'image');
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

// Download all images
Object.entries(imageUrls).forEach(([filename, url]) => {
    downloadImage(url, filename);
});
