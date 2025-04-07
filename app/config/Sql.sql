
CREATE DATABASE movietickets;
USE movietickets;


-- Bảng movies: Lưu thông tin về phim
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(255) NOT NULL,
    duration INT NOT NULL, -- Thời lượng phim (phút)
    release_date DATE NOT NULL,
    trailer_url VARCHAR(255),
    poster_url VARCHAR(255),
);

-- Bảng users: Lưu thông tin người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Nên mã hóa trước khi lưu
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url VARCHAR(255),
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client'
);


-- Bảng rooms: Lưu danh sách phòng chiếu
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- Tên phòng chiếu (ví dụ: "Phòng 1", "VIP 2")
    total_seats INT NOT NULL -- Tổng số ghế trong phòng chiếu
);

-- Bảng showtimes: Lưu thông tin lịch chiếu phim
CREATE TABLE showtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Bảng seats: Lưu thông tin ghế trong phòng chiếu
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL, -- Ghế thuộc phòng nào
    seat_number VARCHAR(10) NOT NULL, -- Ví dụ: "A1", "B2"
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Bảng tickets: Lưu thông tin vé đã mua
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    seat_id INT NOT NULL,
    showtime_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('unused', 'used', 'expired', 'refunded') NOT NULL DEFAULT 'unused',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
);


// cập nhật trạng thái của vé mỗi phút
DELIMITER $$

CREATE EVENT auto_expire_tickets
ON SCHEDULE EVERY 1 MINUTE -- Chạy mỗi phút một lần
DO

    UPDATE tickets
    SET status = 'expired'
    WHERE showtime_id IN (
        SELECT id FROM showtimes WHERE end_time < NOW()
    ) 
    AND status = 'unused';
$$
DELIMITER ;

