import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Phương thức không được hỗ trợ!" });
    }

    const url = req.query.url; // Lấy URL từ query string

    if (!url) {
        return res.status(400).json({ error: "Thiếu URL!" });
    }

    try {
        const headers = {
            "authority": "iloveyt.net",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": "PHPSESSID=ija2v5qviq95qplfpq5ep90112",
            "origin": "https://iloveyt.net",
            "referer": "https://iloveyt.net/vi2",
            "sec-ch-ua": `"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": `"Windows"`,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, như Gecko) Chrome/132.0.0.0 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
        };

        const formData = `url=${encodeURIComponent(url)}`;
        const response = await axios.post("https://iloveyt.net/proxy.php", formData, { headers });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ iloveyt", details: error.message });
    }
}
