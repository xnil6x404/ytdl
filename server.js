const express = require('express');
const ytdl = require('@distube/ytdl-core');
const app = express();
const port = 3000;

// API trả về thông tin video và đường dẫn tải
app.get('/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ success: false, message: 'Bạn cần nhập URL video!' });
    }

    try {
        // Lấy thông tin chi tiết video từ YouTube
        const data = await ytdl.getInfo(url);

        // Lọc danh sách medias để chỉ giữ các URL duy nhất
        const uniqueMedias = [...new Set(data.formats
            .filter(format => format.hasVideo && format.hasAudio)
            .map(format => format.url)
        )];

        // Xử lý thông tin trả về
        const videoInfo = {
            success: true,
            data: {
                url: url,
                source: "youtube",
                title: data.videoDetails.title,
                author: data.videoDetails.author.name,
                thumbnail: data.videoDetails.thumbnails[0]?.url || '',
                duration: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                uploadDate: data.videoDetails.uploadDate,
                subscriberCount: data.videoDetails.author.subscriber_count,
                timestart: new Date().toISOString(), // thời gian bắt đầu truy vấn
                medias: uniqueMedias.map(url => {
                    const format = data.formats.find(f => f.url === url); // Tìm lại format từ url
                    return {
                        url: format.url
                    };
                })
            }
        };

        // Trả về thông tin video dưới dạng JSON
        res.json(videoInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Đã có lỗi xảy ra. Kiểm tra lại URL!'
        });
    }
});


app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});
