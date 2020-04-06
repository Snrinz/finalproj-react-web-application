import React, { Component } from 'react'
import imgMovie from './img/Frozen-2.jpg'
import Comment from './Comment'
import Post from './Post';

export default class DetailMovie extends Component {
    render() {
        let {match} = this.props;

        return (
        <div>
            <h3>ID: {match.params.test}</h3>

            <div className="grid-section">
            
            

            <div className="detail-movie-section">
                {/* <div className="image-detail-wrapped"> */}
                <img id="image-detail-movie" src={imgMovie} alt="sth" />
                {/* </div> */}
                <div className="description-section">

                    <div className="descrip">
                        <h2>โฟรเซ่น 2 ผจญภัยปริศนาราชินีหิมะ (Frozen 2)</h2>
                    </div>

                    <hr style={{opacity: '0'}} />
                    <div className="descrip">
                        <p>แนวประเภท: </p>
                        <p>อนิเมชั่น / ผจญภัย / ตลก</p>
                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>ผู้กำกับ: </p>
                        <p style={{alignSelf: 'center'}}>Chris Buck, Jennifer Lee</p>
                    </div>
                    <hr />
                    
                    <div className="descrip">
                        <p>บทภาพยนตร์: </p>
                        <p style={{alignSelf: 'center'}}>Chris Buck, Jennifer Lee, Marc Smith, Robert Lopez, Kristen Anderson-Lopez</p>
                    </div>

                    <hr />   
                    <p>เรื่องย่อ: </p>
                    <div className="descrip">
                        <span>
                        เรื่องราวการผจญภัยของเจ้าหญิง เอลซ่า ที่ต้องการหาคาตอบจากเสียงเรียกปริศนาที่เธอได้ยินเพียงลำพัง 
                        และเธอต้องออกเดินทางสู่ผืนป่าอาถรรพ์อันกว้างใหญ่ที่ถูกปกคุมด้วยหมอกที่ไม่มีใครเข้าไปได้และไม่มีใครออกมาได้เป็นเวลาหลายปี 
                        เจ้าหญิง เอลซ่า เดินทางไปยังป่าพร้อมกับน้องสาว อันนา ที่ควงแฟนหนุ่ม คริสทอฟ พร้อมกับสัตว์คู่ใจอย่าง สเวน ไปด้วย และยังมี โอลาฟ 
                        รูปปั้นหิมะที่มีชีวิตร่วมออกเดินทางในครั้งนี้ เจ้าหญิง เอลซ่า ต้องการหาคาตอบของเสียงและหาคาตอบว่าทาไมเธอถึงได้เกิดมาพร้อมกับพลังวิเศษ 
                        และได้รู้ความลับของความขัดแย้งระหว่าง เอเรนเดล กับ นอร์ธัลดรา ที่อาจจะเปลี่ยนแปลงชีวิตและนาไปสู่คาตอบที่แท้จริงของเธอ
                        </span>
                    </div>
                </div>    
                 
            </div>

            <Comment />
            <Comment />
            <Comment />

            <Post />


            </div>
         
        </div>

        )
    }
}
