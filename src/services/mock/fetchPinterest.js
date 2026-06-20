import puppeteer from 'puppeteer';

// 📌 DÁN LINK BẢNG PINTEREST CỦA BẠN VÀO ĐÂY
const PINTEREST_BOARD_URL = 'https://www.pinterest.com/hyuytr/aesthetics/';

(async () => {
    console.log("🚀 Đang khởi động trình duyệt ngầm...");
    const browser = await puppeteer.launch({
        headless: "false", // Hoặc để false nếu bạn muốn nhìn thấy trình duyệt tự bật lên cuộn cuộn cho ngầu
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();
    
    // Cấu hình màn hình lớn để load được nhiều ảnh một lúc
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`🌐 Đang đi tới bảng: ${PINTEREST_BOARD_URL}`);
    await page.goto(PINTEREST_BOARD_URL, { waitUntil: 'networkidle2' });

    console.log("📜 Đang cuộn trang để load thêm ảnh ẩn...");
    // Cuộn xuống 3 lần để Pinterest kịp tải thêm ảnh (bạn có thể tăng số này lên)
    for (let i = 0; i < 3; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
        await new Promise(resolve => setTimeout(resolve, 2000)); // Đợi 2 giây cho ảnh load
    }

    console.log("📸 Đang cào dữ liệu ảnh theo cấu trúc srcset...");
    
    // Đoạn code cào "bắt bài" srcset nằm ở đây:
    const pinData = await page.evaluate(() => {
        const imgElements = document.querySelectorAll('img[srcset]');
        const data = [];

        imgElements.forEach(img => {
            const srcset = img.getAttribute('srcset');
            if (srcset) {
                const links = srcset.split(',').map(item => item.trim());
                let highResUrl = '';
                
                // Ưu tiên lấy link ảnh gốc chất lượng cao nhất
                const originalLink = links.find(link => link.includes('/originals/'));
                if (originalLink) {
                    highResUrl = originalLink.split(' ')[0];
                } else {
                    highResUrl = links[links.length - 1].split(' ')[0];
                }

                const width = img.naturalWidth || img.clientWidth || 0;
                const height = img.naturalHeight || img.clientHeight || 0;

                // Lọc bỏ icon, chỉ lấy ảnh thật
                if (width > 100 && highResUrl) {
                    data.push({
                        src: highResUrl,
                        width: width,
                        height: height
                    });
                }
            }
        });
        return data;
    });

    console.clear();
    console.log(`🎉 Đã cào thành công ${pinData.length} ảnh từ bảng!`);
    console.log(pinData);

    // Ở ĐÂY: Bạn có thể viết tiếp code để `pinData` này ném thẳng lên Supabase
    // console.log(JSON.stringify(pinData, null, 2));

    await browser.close();
    console.log("🔒 Đã đóng trình duyệt.");
})();   