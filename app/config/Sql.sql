
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
    poster_url VARCHAR(255)
);

INSERT INTO movies (name, description, genre, duration, release_date, trailer_url, poster_url) VALUES
('Cuộc Chiến Sinh Tử', 'Phim kể về cuộc chiến sinh tồn giữa những người bị mắc kẹt trong một khu vực bị hủy diệt. Họ phải đối mặt với những thử thách và chiến đấu để sống sót. Với những pha hành động nghẹt thở và một câu chuyện đầy kịch tính, "Cuộc Chiến Sinh Tử" sẽ khiến bạn không thể rời mắt khỏi màn hình.', 'Action', 120, '2024-05-01', 'https://youtu.be/Eu9G8nO5-Ug?si=_XMzq7QLLF-DMD9n', '/uploads/posters/poster1.jpg'),
('Nghề Siêu Dễ', 'Ông Thái là một cảnh sát về hưu nhưng không chịu an phận thủ thường, hàng ngày vẫn đi tìm bắt tội phạm vặt trong xóm cho đỡ nhớ nghề. Một ngày kia, Hoàng - tên trùm ma túy mới ra tù bỗng dưng chuyển đến xóm ông và mở một văn phòng bất động sản. Nghi ngờ đây là nơi làm ăn phi pháp, ông Thái quyết định âm thầm điều tra. Ông mua lại tiệm cơm tấm đối diện trụ sở của Hoàng để làm nơi theo dõi, đồng thời thu nạp Thu - Phú - Vinh - Mèo, đám thanh niên “bất hảo” trong xóm về quán hỗ trợ buôn bán để rảnh tay "phá án". Trớ trêu thay, tiệm cơm bất ngờ nổi tiếng và ăn nên làm ra, khiến cho "chuyên án đặc biệt" của ông đứng trước nguy cơ đổ bể.', 'Action, Comedy', 113, '2022-04-29', 'https://youtu.be/odb5t4i3EKs?si=lDFQpYh08eG6Vefk', '/uploads/posters/poster2.jpg'),
('Đêm Kinh Hoàng', 'Một nhóm bạn trẻ quyết định tham gia một trò chơi mạo hiểm vào đêm khuya, nhưng họ không biết rằng những sự kiện kỳ quái sẽ bắt đầu xảy ra. Một câu chuyện về nỗi sợ hãi, sự bất an và những bí mật đen tối, "Đêm Kinh Hoàng" sẽ khiến bạn không dám tắt đèn.', 'Horror', 95, '2024-07-20', 'https://youtu.be/xXVtZpw2s6s?si=3DogQR1owg-UMEN1', '/uploads/posters/poster3.jpg'),
('Mến Gái Miền Tây', 'Bối cảnh câu chuyện diễn ra sau web drama 12 năm, khi Mến và Nhớ (Hoàng Nguyên) đã vượt qua rất nhiều thử thách và có được cuộc sống hạnh phúc bên nhau. Thế nhưng, chính lúc này, sóng gió lại nổi lên. Nhớ bắt đầu không chấp nhận được giới tính thật sự của vợ mình và có mối quan hệ với người con gái khác.', 'Comedy', 107, '2023-03-25', 'https://youtu.be/e4MExEvgYvE?si=4K7r6FPeyM-Ccmep', '/uploads/posters/poster4.jpg'),
('Kẻ Báo Thù', 'Sau khi gia đình bị tấn công, một người đàn ông quyết định tìm kiếm và trả thù những kẻ đã làm hại mình. Bộ phim là một hành trình đầy kịch tính, với những pha hành động quyết liệt và cảm giác hồi hộp đến nghẹt thở.', 'Action', 130, '2024-05-12', 'https://youtu.be/bbpjwIQDueU?si=5SvIGrBH1H7J9ySm', '/uploads/posters/poster5.jpg'),
('Người Lắng Nghe: Lời Thì Thầm', 'Chuyện phim kể về việc bác sỹ tâm lý Tường Minh (Quang Sự) trị liệu cho nhà văn trẻ An Nhiên (Oanh Kiều) bị trầm cảm, dẫn đến rối loạn lo âu. Nhiên cho rằng bản thân đang bị một cô gái ám ảnh. Điều kỳ lạ là, cô gái mà Nhiên hay nhắc đến lại là nhân vật chính trong quyển truyện “Lời thì thầm”, một sáng tác đầu tay của Nhiên. Bằng các biện pháp chuyên môn, Tường Minh cố gắng giúp An Nhiên đối diện lại với những câu chuyện trong quá khứ. Anh hy vọng điều này sẽ giúp cô giải tỏa được những uẩn ức, từ đó vượt qua những ám ảnh và bắt đầu một cuộc sống mới. Tuy nhiên, trong quá trình nhập tâm để điều trị cho An Nhiên, Tường Minh cũng dần dần bị cuốn vào chính câu chuyện và những ám ảnh của Nhiên. Từ đây, Tường Minh thường xuyên gặp ác mộng, thấy ảo giác. Và đỉnh điểm là Minh cũng thấy bản thân cũng đang dần bị ám ảnh bởi một cô gái lạ.', 'Horror, Comedy, Romance', 120, '2022-03-04', 'https://youtu.be/b8cKMxApetA?si=xPY195rl9tC4gqsz', '/uploads/posters/poster6.jpg'),
('Vô Diện Sát Nhân', 'Câu chuyện xoay quanh một cô gái trẻ, ngày qua ngày bị ám ảnh bởi một tên sát nhân bí ẩn xuất hiện trong ánh màn đêm. Tình tiết phim thắt chặt mỗi lần cô gặp phải sự xuất hiện của tên sát nhân đáng sợ. Liệu tên sát nhân này có thật sự tồn tại hay chỉ là một phần của tâm trí và trí tưởng tượng của cô gái? Câu hỏi này tạo nên một lớp màn che kín bí mật và làm nổi bật sự căng thẳng và kịch tính trong phim.', 'Horror, Psychological', 87, '2022-08-26', 'https://youtu.be/-ouomaBrDK4?si=Ws7g83dpOCcr1Tz9', '/uploads/posters/poster7.jpg'),
('Mười: Lời Nguyền Trở Lại', 'Bộ phim tường thuật một câu chuyện bí ẩn và kỳ quái xảy ra trong căn nhà của nhân vật chính, Linh Chi. Trong không gian ấy, những điều kỳ lạ và đáng sợ xuất hiện liên tục, làm nổi bật sự bí ẩn bao phủ căn nhà này. Một phần của những bí mật này bắt nguồn từ một lời nguyền đặc biệt, một lời nguyền đưa ra cho kẻ thứ ba.', 'Horror', 95, '2022-09-30', 'https://youtu.be/FQhA7--t2XE?si=6GQ3t06p0oWxR8H6', '/uploads/posters/poster8.jpg'),
('Thanh Sói', 'Bộ phim là một bức tranh sống động về cuộc sống của những cô gái ở những nơi tối tăm và nghèo nàn của thành phố, bao gồm các khu ổ chuột, các vũ trường sôi động và những ngõ tối ẩn mình. Trong thế giới này, Thanh Sói nổi lên như một nữ trùm mạnh mẽ và từ đây câu chuyện bắt đầu trải qua nhiều biến cố, rắc rối. Cuộc hành trình của các nhân vật sẽ phản ánh sự đấu tranh, lòng kiên nhẫn và lòng dũng cảm của cô trong cuộc sống đầy khó khăn.', 'Action, Psychological', 109, '2022-12-23', 'https://youtu.be/nL4LorD2Kik?si=tdmlsCoVemwDkG54', '/uploads/posters/poster9.jpg'),
('Móng Vuốt', 'Chuyện phim xoay quanh nhóm bạn chơi thân với nhau từ thời trung học. Nhằm kỷ niệm cột mốc 10 năm gắn bó, cả hội quyết định rời xa phố thị, tìm đến khu rừng vùng ngoại ô “đổi gió”. Tiếc rằng, chuyến đi dã ngoại tưởng chừng đáng nhớ ấy bỗng chốc trở thành cơn ác mộng kinh hoàng, khi họ bắt gặp ánh mắt của một sinh vật nguy hiểm đang rình rập trong bóng tối.', 'Horror, Psychological', 115, '2024-06-07', 'https://youtu.be/uVuARLQdC8Y?si=3Q1L-TJTsnnXeW53', '/uploads/posters/poster10.jpg'),
('Maika - Cô Gái Đến Từ Hành Tinh Khác', 'Bộ phim đặc sắc này kể về một tình bạn trong sáng và đầy xúc động giữa hai đứa trẻ, Hùng và Maika, hai người thuộc hai hành tinh khác nhau. Nếu Hùng là cậu bé với trái tim tan vỡ sau những trải nghiệm đau thương, trong khi Maika là cô bé đến từ một hành tinh xa lạ, đã xuất hiện như một thiên thần hộ mệnh trong cuộc sống của cậu. Maika đã giúp Hùng chữa lành những vết thương lòng, đánh thức lại niềm tin và khả năng yêu thương trong trái tim của cậu.', 'Children, Comedy', 105, '2022-05-27', 'https://youtu.be/mOH-VKJBsh8?si=IG5AmLAP0GG8mKGa', '/uploads/posters/poster11.jpg'),
('Chuyện Ma Gần Nhà', 'Phim chứa đựng ba câu chuyện "bắt ma" khác nhau, mỗi câu chuyện tiết lộ một mảng sự thật kinh hoàng mà người xem sẽ không thể dự đoán trước được. Những tình tiết đan xen và sự kết hợp giữa hình ảnh đẹp và âm thanh ám ảnh làm cho Chuyện Ma Gần Nhà trở thành một tác phẩm kinh dị đáng xem của điện ảnh Việt Nam. Đây là một lựa chọn thú vị cho những ai yêu thích thể loại kinh dị và muốn tận hưởng những phút giây căng thẳng và rùng rợn trên màn ảnh rạp.', 'Horror, Psychological', 105, '2022-02-11', 'https://youtu.be/nFeKDjyeP2M?si=c1LtuVJtCb9pYofJ', '/uploads/posters/poster12.jpg'),
('Red One: Mật Mã Đỏ', 'Sau khi Ông già Noel (mật danh: Red One) bị bắt cóc, Trưởng An ninh Bắc Cực (Dwayne Johnson) phải hợp tác với thợ săn tiền thưởng khét tiếng nhất thế giới (Chris Evans) trong một nhiệm vụ kịch tính xuyên lục địa để giải cứu Giáng Sinh.', 'Action, Comedy', 125, '2024-11-08', 'https://youtu.be/2T_mKyH17mY?si=u5bu8FQU3szKijO5', '/uploads/posters/poster13.jpg'),
('Venom: Kèo Cuối', 'Đây là phần phim cuối cùng và hoành tráng nhất về cặp đôi Venom và Eddie Brock (Tom Hardy). Sau khi dịch chuyển từ Vũ trụ Marvel trong ‘Spider-man: No way home’ (2021) trở về thực tại, Eddie Brock giờ đây cùng Venom sẽ phải đối mặt với ác thần Knull hùng mạnh - kẻ tạo ra cả chủng tộc Symbiote và những thế lực đang rình rập khác. Cặp đôi Eddie và Venom sẽ phải đưa ra lựa quyết định khốc liệt để hạ màn kèo cuối này.', 'Action', 109, '2024-10-25', 'https://youtu.be/HyIyd9joTTc?si=yCcZ1Fz1DMeZzzz4', '/uploads/posters/poster14.jpg'),
('Đố Anh Còng Được Tôi', 'Các thanh tra kỳ cựu nổi tiếng đã hoạt động trở lại! Thám tử Seo Do-cheol (HWANG Jung-min) và đội điều tra tội phạm nguy hiểm của anh không ngừng truy lùng tội phạm cả ngày lẫn đêm, đặt cược cả cuộc sống cá nhân của họ. Nhận một vụ án sát hại một giáo sư, đội thanh tra nhận ra những mối liên hệ với các vụ án trong quá khứ và nảy sinh những nghi ngờ về một kẻ giết người hàng loạt. Điều này đã khiến cả nước rơi vào tình trạng hỗn loạn. Khi đội thanh tra đi sâu vào cuộc điều tra, kẻ sát nhân đã chế nhạo họ bằng cách công khai tung ra một đoạn giới thiệu trực tuyến, chỉ ra nạn nhân tiếp theo và làm gia tăng sự hỗn loạn. Để giải quyết mối đe dọa ngày càng leo thang, nhóm đã kết nạp một sĩ quan tân binh trẻ Park Sun-woo (JUNG Hae-in), dẫn đến những khúc mắc và đầy rẫy bất ngờ trong vụ án.', 'Action, Comedy', 118, '2024-09-27', 'https://youtu.be/JgUWVooKSrA?si=UlkXwBCGm-dvidUS', '/uploads/posters/poster15.jpg'),
('Ted Yod: Quỷ Ăn Tạng 2', 'Ba năm sau cái chết của Yam, Yak vẫn tiếp tục săn lùng linh hồn bí ẩn mặc áo choàng đen. Gặp một cô gái có triệu chứng giống Yam, Yak phát hiện ra người bảo vệ linh hồn, pháp sư ẩn dật Puang, sống trong một khu rừng đầy nguy hiểm. Giữa những phép thuật ma quỷ và những sinh vật nguy hiểm. Khi họ đuổi theo linh hồn mặc áo choàng đen, tiếng kêu đầy ám ảnh của Tee Yod sắp quay trở lại một lần nữa...', 'Horror', 111, '2024-10-18', 'https://youtu.be/xVVZvSybaEc?si=YHWAPUUXa5iHqggz', '/uploads/posters/poster16.jpg'),
('Mộ Đom Đóm', 'Hai anh em Seita và Setsuko mất mẹ sau cuộc thả bom dữ dội của không quân Mỹ. Cả hai phải vật lộn để tồn tại ở Nhật Bản hậu Thế chiến II. Nhưng xã hội khắc nghiệt và chúng vật lộn tìm kiếm thức ăn cũng như thoát khỏi những khó khăn giữa chiến tranh.', 'Children', 89, '2024-10-04', 'https://youtu.be/HgDzVFMi238?si=xj-iZWdE0n9a2foo', '/uploads/posters/poster17.jpg'),
('Conan Movie 27: Ngôi Sao 5 Cánh 1 Triệu Đô', 'Trong khi đến Hakodate tham gia một giải kiếm đạo, Conan và Heiji đụng độ siêu trộm Kaito Kid - khi hắn đang nhắm tới một thanh kiếm Nhật được cất giấu trong nhà kho của một gia đình tài phiệt. Thi thể một tay buôn vũ khí khét tiếng được phát hiện với vết chém hình chữ thập, và trùng hợp thay, "kho báu" mà gã truy lùng dường như cũng có liên quan mật thiết đến thanh kiếm cổ mà Kid đang nhắm tới.', 'Children', 111, '2024-08-02', 'https://youtu.be/C4pG3GbhQZw?si=-u4atKO8xLpH2m4k', '/uploads/posters/poster18.jpg'),
('Deadpool 3: Deadpool và Wolverine', 'Sự hợp tác giữa hai nhân vật nổi tiếng Deadpool và Wolverine trong Deadpool 3: Deadpool và Wolverine chắc chắn là điểm nhấn của năm 2024. Đây là một trong những bộ phim hay chiếu rạp hứa hẹn sẽ làm bùng nổ phòng vé và thu hút đông đảo người xem, đặc biệt là fan hâm mộ hai siêu anh hùng này.', 'Action', 127, '2024-07-27', 'https://youtu.be/BmwqLXEB2pU?si=ha35F1Zd8L20Gd-H', '/uploads/posters/poster19.jpg'),
('Bơi đêm - Night Swim', 'Từ câu chuyện về cuộc sống gia đình bình thường đã biến thành một nỗi ám ảnh kinh hoàng. Không chạy, không lặn, không cứu hộ và không bơi sau khi màn đêm buông xuống. Bơi Đêm chạm đến nỗi sợ hãi sâu thẳm của bất kỳ ai mỗi khi bước xuống hồ bơi rằng họ sẽ bị mắc kẹt dưới nước.', 'Horror', 99, '2024-02-23', 'https://youtu.be/l9WbuhYa2Q0?si=6XGxqVuJCOrFQnsT', '/uploads/posters/poster20.jpg'),
('Scarygirl - Arkie và ngày mặt trời mất tích', 'Khi thế giới bị đe dọa bởi sự biến mất của ánh sáng mặt trời, Arkie phải vượt qua nỗi sợ hãi của bản thân và đi đến một thành phố tưởng tượng để cứu cha của mình khỏi tay một nhà khoa học bí ẩn và ngăn chặn hành tinh của cô bị hủy diệt.', 'Children', 93, '2024-01-05', 'https://youtu.be/EGYxDe_OJ_M?si=XbWpho8PX42KR3IV', '/uploads/posters/poster21.jpg'),
('M3GAN ', 'Bộ phim này nói về M3GAN - một con robot thông minh. M3GAN được người dì Gemma tạo nên và đưa về nhà làm bạn với cháu của mình là Cady. Mối quan hệ giữa Cady và M3GAN ngày càng thân thiết. M3GAN xem Cady là bạn và chủ của mình, nên sẵn sàng làm hại bất cứ ai tổn thương đến cô bé.', 'Horror', 102, '2024-01-27', 'https://youtu.be/d7pr1msPxtg?si=WIQtSXGFy_ySdCwK', '/uploads/posters/poster22.jpg'),
('BABYLON', 'Từ đạo diễn Damien Chazelle, BABYLON là bộ phim lấy bối cảnh Los Angeles vào những năm 1920, do Brad Pitt, Margot Robbie và Diego Calva đóng chính, cùng dàn diễn viên bao gồm Jovan Adepo, Li Jun Li và Jean Smart. Một câu chuyện về sự tham vọng và xa hoa thái quá, cùng với đó là sự thăng trầm của nhiều nhân vật trong thời đại suy đồi và sa đọa không thể kiềm chế ở Hollywood thời sơ khai.', 'Comedy, Psychological', 188, '2023-02-03', 'https://youtu.be/5muQK7CuFtY?si=MukEjZIG2G29dpKe', '/uploads/posters/poster23.jpg'),
('Mèo Đi Hia: Điều ước cuối cùng', 'Nếu bạn đang tìm kiếm phim chiếu rạp hoạt hình đáng xem nhất đầu năm 2024, Mèo Đi Hia: Điều ước cuối cùng là lựa chọn tuyệt vời. Bộ phim này kể về cuộc phiêu lưu của Puss, một chú mèo đam mê thám hiểm và đầy khí chất.', 'Children', 102, '2022-12-21', 'https://youtu.be/5ZdgiQBi3NM?si=bYBL4FOtU6tL26T7', '/uploads/posters/poster24.jpg'),
('Mèo béo siêu đẳng', 'Maurice - một con mèo biết nói vụng về với tài năng bẩm sinh là lừa gạt người khác. Darktan- thuyền trưởng của một bầy chuột tinh nghịch đang cùng bạn mình Maurice đang mưu tính về một hòn đảo thiên đường nơi chuột và con người chung sống hòa bình với nhau. Liệu gian lận này có bị vạch trần? Và điều bất ngờ gì đang chờ đợi Maurice cùng những người bạn trên hành trình đến hòn đảo thiên đường?', 'Children', 93, '2023-01-25', 'https://youtu.be/ZVPsz9pO1Ag?si=gk1ujDdaqIIHmTrd', '/uploads/posters/poster25.jpg'),
('Siêu lừa gặp siêu lầy', 'Thuộc phong cách hành động – hài hước với các “cú lừa” thông minh và lầy lội đến từ bộ đôi Tú (Anh Tú) và Khoa (Mạc Văn Khoa), Siêu Lừa Gặp Siêu Lầy của đạo diễn Võ Thanh Hòa theo chân của Khoa – tên lừa đảo tầm cỡ “quốc nội” đến đảo ngọc Phú Quốc với mong muốn đổi đời. Tại đây, Khoa gặp Tú – tay lừa đảo “hàng real” và cùng Tú thực hiện các phi vụ từ nhỏ đến lớn. Cứ ngỡ sự ranh mãnh của Tú và sự may mắn trời cho của Khoa sẽ giúp họ trở thành bộ đôi bất khả chiến bại, nào ngờ lại đối mặt với nhiều tình huống dở khóc – dở cười. Nhất là khi băng nhóm của bộ đôi nhanh chóng mở rộng vì sự góp mặt của ông Năm (Nhất Trung) và bé Mã Lai (Ngọc Phước).', 'Comedy', 112, '2023-03-03', 'https://youtu.be/kdn0xrDf8tY?si=kj9r2eYvs6VjPGVl', '/uploads/posters/poster26.jpg'),
('Học Viện Anh Hùng: You’re Next ', 'bộ phim hành động gay cấn xoay quanh các học sinh lớp 1-A của U.A. High, bao gồm Deku, Bakugo, và Todoroki. Họ phải đối mặt với kẻ thù mới: Dark Might và tổ chức tội phạm bí ẩn Gia tộc Gollini dưới sự kiểm soát của hắn. Được trang bị những kỹ năng và sức mạnh độc đáo, các anh hùng trẻ tuổi phải hợp tác và vận dụng mọi khả năng để bảo vệ thế giới khỏi kế hoạch tàn bạo của Dark Might.', 'Children', 100, '2024-11-08', 'https://youtu.be/O_JcwpDergM?si=1n_01Qtcq8vGk7Ld', '/uploads/posters/poster27.jpg'),
('Hành Trình Moana 2', '“Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở lại trong chuyến phiêu lưu cùng với những thành viên mới. Theo tiếng gọi của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa xôi của Châu Đại Dương và sẽ đi tới vùng biển nguy hiểm, đã mất tích từ lâu. Cùng chờ đón cuộc phiêu lưu của Moana đầy chông gai sắp tới nhé.', 'Children', 99, '2024-12-04', 'https://youtu.be/cBG30KsGRH8?si=MxME93OdIyrRCu4f', '/uploads/posters/poster28.jpg'),
('Ozi: Phi Vụ Rừng Xanh', 'Câu chuyện xoay quanh Ozi, một cô đười ươi mồ côi có tầm ảnh hưởng, sử dụng những kỹ năng học được để bảo vệ khu rừng và ngôi nhà của mình khỏi sự tàn phá của nạn phá rừng. Đây là một bộ phim đầy hy vọng, truyền cảm hứng cho thế hệ trẻ mạnh dạn cất tiếng nói và hành động để bảo vệ ngôi nhà chung quý giá.', 'Children', 87, '2024-11-15', 'https://youtu.be/tyHPFFnDuZY?si=VXOlfcitXse-BTQI', '/uploads/posters/poster29.jpg'),
('Bay vào tử địa', 'Sự cố sét đánh đã làm cho chuyến bay của cơ trưởng Brodie phụ trách rơi xuống quần đảo do phiến quân chiếm đóng. Cú rơi chỉ là sự khởi đầu cho những cơn ác mộng khi cơ trưởng buộc phải hợp tác với một kẻ sát nhân để giành lại mạng sống cho cả đoàn.', 'Action', 108, '2023-02-03', 'https://youtu.be/FuQpBg_hDds?si=V_tCjeFH4AjcLeuX', '/uploads/posters/poster30.jpg');

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
INSERT INTO users (username, password, phone, email, avatar_url, role)
VALUES (
    'admin',
    '$2b$10$OMYfQv3l3OQrTejhxALfJ.Hc/El8uF7lOEpDHDeZ0pRxVtcr5XICm',
    '0921212276',
    'tin@example.com',
    '/uploads/avatars/default.png',
    'admin'
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

