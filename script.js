// 存储所有小说的信息
let books = [];

// 页面加载时，读取小说列表和上次的状态
window.onload = function() {
    loadBooks();
    
    // 恢复上次的搜索词
    setTimeout(() => {
        const lastSearch = localStorage.getItem('lastSearch');
        if (lastSearch) {
            document.getElementById('searchInput').value = lastSearch;
            searchBooks();
        }
        
        // 恢复上次的滚动位置
        const lastScroll = localStorage.getItem('lastScroll');
        if (lastScroll) {
            window.scrollTo(0, parseInt(lastScroll));
        }
    }, 200);
};

// 滚动时保存位置
let scrollTimer;
window.onscroll = function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        localStorage.setItem('lastScroll', scrollPos);
    }, 200);
};

// 加载小说列表
async function loadBooks() {
    const bookList = document.getElementById('bookList');
    
    try {
        const mockBooks = [
            { name: '25小时（打字机）.txt' },
            { name: '两A相逢必有一O（厉冬忍）.txt' },
            { name: '二哈和他的白猫师尊 （肉包不吃肉）.txt' },
            { name: '养狼为患（青端）.txt' },
            { name: '判官（木苏里）.txt' },
            { name: '南方海啸（卡比丘）.txt' },
            { name: '同学婚约（几京）.txt' },
            { name: '和沈先生协议结婚后（公子如兰）.txt' },
            { name: '好运时间（卡比丘）.txt' },
            { name: '将进酒 (唐酒卿）.txt' },
            { name: '小潭山没有天文台 (清明谷雨) .txt' },
            { name: '山海之间（木小吉）.txt' },
            { name: '悬日（稚楚）.txt' },
            { name: '我亲爱的法医小姐（酒暖春深）.txt' },
            { name: '我和对象比命长（云霄YX）.txt' },
            { name: '我在惊悚游戏里封神（壶鱼辣椒）.txt' },
            { name: '我行让我上（酱子贝）.txt' },
            { name: '提灯映桃花（淮上）.txt' },
            { name: '旅鸟（山颂）.txt' },
            { name: '日出风来（春日夏禾）.txt' },
            { name: '星垂平野（木小吉）.txt' },
            { name: '春日出逃手札（故栀）.txt' },
            { name: '暧昧备份（尤里麦）.txt' },
            { name: '木偶综合症（青石018）.txt' },
            { name: '沙雕学霸系统（小霄）.txt' },
            { name: '洄天（淮上）.txt' },
            { name: '漂亮beta和顶A假婚真爱了（山木晏）.txt' },
            { name: '热带公路（子律）.txt' },
            { name: '百万UP学神天天演我（小霄）.txt' },
            { name: '皇恩浩荡（白芥子）.txt' },
            { name: '穿成高危职业之师尊（一丛音）.txt' },
            { name: '等你落地我们再谈（思谦冲）.txt' },
            { name: '美学公式（空菊）.txt' },
            { name: '脱缰（梅子瞎了）.txt' },
            { name: '荒谬之敌（星坠）.txt' },
            { name: '荒野植被（麦香鸡呢）.txt' },
            { name: '蝶变（麟潜）.txt' },
            { name: '装傻后我坑了渣攻（板栗丸子）.txt' },
            { name: '贵族男校 (郑九煞NP) .txt' },
            { name: '越界（几京）.txt' },
            { name: '逐云墓场（今天全没月光）.txt' },
            { name: '陈年烈苟（不问三九）.txt' },
            { name: '靡言（回南雀）.txt' }
        ];
        
        books = mockBooks;
        // 默认按文件名A-Z排序
        books.sort((a, b) => a.name.localeCompare(b.name));
        document.getElementById('bookCount').textContent = books.length;
        displayBooks(books);
        
    } catch (error) {
        bookList.innerHTML = '<div class="no-results">加载失败，请刷新重试</div>';
    }
}

// 显示小说列表
function displayBooks(booksToShow) {
    const bookList = document.getElementById('bookList');
    
    if (booksToShow.length === 0) {
        bookList.innerHTML = '<div class="no-results">📖 没有找到匹配的小说</div>';
        return;
    }
    
    let html = '';
    booksToShow.forEach(book => {
        const displayName = book.name.replace('.txt', '');
        
        html += `
            <div class="book-item">
                <div class="book-info">
                    <span class="book-icon">📄</span>
                    <span class="book-name">${displayName}</span>
                    <span class="book-meta">TXT</span>
                </div>
                <div class="book-actions">
                    <button class="action-btn read-btn" onclick="readBook('${book.name}')">阅读</button>
                    <button class="action-btn download-btn" onclick="downloadBook('${book.name}')">下载</button>
                </div>
            </div>
        `;
    });
    
    bookList.innerHTML = html;
}

// 搜索功能
function searchBooks() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    localStorage.setItem('lastSearch', searchText);
    
    if (!searchText) {
        displayBooks(books);
        return;
    }
    
    const filtered = books.filter(book => 
        book.name.toLowerCase().includes(searchText)
    );
    
    displayBooks(filtered);
}

// 阅读功能（跳转到阅读页）
function readBook(fileName) {
    const searchText = document.getElementById('searchInput').value;
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    localStorage.setItem('lastSearch', searchText);
    localStorage.setItem('lastScroll', scrollPos);
    
    window.location.href = `reader.html?file=${encodeURIComponent(fileName)}`;
}

// 下载功能
function downloadBook(fileName) {
    const link = document.createElement('a');
    link.href = `novels/小说/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}