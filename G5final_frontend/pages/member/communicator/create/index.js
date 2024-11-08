import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import { useAuth } from '@/hooks/use-auth';
Create.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Create(props) {
  const { auth } = useAuth()
  const memberID = auth.memberData.id
  const submitForm = (event) => { 
    event.preventDefault()
    const form = document.querySelector("#create")
    const formData = new FormData(form)
    console.log(formData);
    
    try { 
      fetch("http://localhost:3005/api/pet/communicatorCreate", {
        method: "POST",
        body: formData
      })
    } catch (err) {console.log(err);
     }
  }
  const [imagePreview, setImagePreview] = useState()
  console.log(imagePreview);
  
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  return (
    <>
      <div className="PT-create">
        <div className="container">
          {/* 第一張卡 */}
          <div className="title-card">
            <h4 className="title">註冊成為溝通師</h4>
            <div className="title-text">
              <p>1.需持有亞洲動物溝通師證照者</p>
              <p>2.提供證照正本照片以供審核</p>
              <p>3.刊登內容不得有不當文字.影像等...</p>
              <p>
                4.成功註冊後可自行設定是否刊登但未刊登達90日將自動移除溝通師身分，須另行重新申請審核
              </p>
              <p>
                5.若期間遭遇客戶反饋.過程中異常.假冒.或其餘等非法行為.經證實者將永久移除資格
              </p>
            </div>
          </div>
          {/* 第二張卡 */}
          <div className="input-card mt-3">
            {/* title */}
            <div className="col-12">
              寵物溝通師證照 <br />
              (驗證用.不公開)
            </div>
            {/* 表單 */}
            <form id='create' onSubmit={submitForm}>
              <div className="row d-flex mt-3">
                {/* 照片 */}
                <div className="col-12 col-lg-4 d-flex pic-wrapper">
                  <div className="pic">
                    {/* <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="上傳圖片" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (<svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width={181}
                        height={163}
                        viewBox="0 0 181 163"
                        fill="none"
                      >
                        <path
                          d="M181 24.8636V86.9317C178.656 93.6334 171.543 93.6334 167.489 88.9972C160.676 81.2136 153.348 73.8473 146.235 66.3079C142.212 62.0448 138.186 57.7851 134.011 53.3591C116.784 74.3797 99.6631 95.2749 82.5035 116.214C87.8274 122.848 93.0524 129.39 98.3516 135.881C98.6839 136.288 99.5783 136.428 100.215 136.431C108.342 136.468 116.469 136.431 124.597 136.465C128.757 136.478 131.861 139.422 131.861 143.241C131.861 147.057 128.75 150.011 124.586 150.011C92.2534 150.024 59.9209 150.072 27.5884 149.983C14.7416 149.949 3.36547 140.796 0.675215 128.708C0.466641 127.779 0.22625 126.86 0 125.938C0 92.2463 0 58.5549 0 24.8636C0.10959 24.5516 0.268672 24.2464 0.318164 23.9242C2.37916 10.6939 14.1477 0.814391 28.1186 0.797433C69.7062 0.753343 111.294 0.756735 152.885 0.797433C165.679 0.807608 176.708 9.07951 180.024 20.9498C180.385 22.2454 180.678 23.5579 181 24.8636ZM166.859 67.9528V66.1553C166.859 53.6067 166.873 41.0581 166.856 28.5129C166.842 20.1562 160.779 14.3567 152.047 14.3533C110.986 14.3431 69.9254 14.3431 28.861 14.3533C20.2423 14.3533 14.1512 20.1799 14.1477 28.4281C14.1336 59.742 14.1336 91.0524 14.1477 122.366C14.1512 130.614 20.2458 136.438 28.861 136.448C45.5929 136.465 62.3213 136.455 79.0532 136.448C79.5445 136.448 80.0359 136.387 80.8031 136.333C70.3001 123.258 59.9668 110.401 49.5346 97.4149C48.9619 98.0932 48.5129 98.6019 48.0923 99.1276C45.2889 102.617 42.5138 106.131 39.6786 109.597C37.0802 112.775 32.8451 113.358 29.6564 111.045C26.4712 108.736 25.895 104.629 28.4474 101.403C33.538 94.9662 38.664 88.5563 43.8819 82.2141C44.7127 81.2069 45.9924 80.3624 47.2474 79.8842C50.1921 78.7548 53.19 79.7723 55.3429 82.4346C61.0451 89.489 66.7119 96.5704 72.3965 103.638C72.7676 104.1 73.1707 104.54 73.6125 105.056C74.1004 104.476 74.4398 104.089 74.765 103.689C92.3842 82.1904 110.003 60.6916 127.626 39.1962C130.981 35.1026 135.732 34.9602 139.384 38.8231C142.944 42.5911 146.493 46.3692 150.053 50.1406C155.543 55.9604 161.033 61.7769 166.859 67.9494V67.9528Z"
                          fill="#777777"
                        />
                        <path
                          d="M181 122.886C180.717 123.503 180.473 124.141 180.144 124.731C177.882 128.784 172.413 129.557 168.889 126.253C166.403 123.923 164.045 121.471 161.624 119.08C161.235 118.694 160.811 118.341 160.121 117.717C160.121 118.66 160.121 119.253 160.121 119.85C160.121 131.602 160.146 143.357 160.111 155.108C160.097 160.097 155.469 163.391 150.753 161.858C147.777 160.891 145.991 158.378 145.988 155.051C145.977 143.242 145.984 131.432 145.984 119.623C145.984 119.023 145.984 118.419 145.984 117.503C145.348 118.039 144.956 118.338 144.598 118.67C141.951 121.163 139.374 123.73 136.648 126.142C133.728 128.729 129.457 128.553 126.785 125.897C124.155 123.282 124.024 119.206 126.746 116.56C131.624 111.816 136.496 107.044 141.636 102.567C148.155 96.8863 158.453 97.0355 164.82 102.879C169.755 107.407 174.41 112.209 179.105 116.974C179.961 117.842 180.381 119.097 181.004 120.176V122.889L181 122.886Z"
                          fill="#777777"
                        />
                        <path
                          d="M70.7031 45.5795C70.6925 56.7748 61.1087 65.9252 49.4215 65.9014C37.7696 65.8777 28.2459 56.6561 28.2848 45.437C28.3237 34.3332 37.8827 25.2066 49.4816 25.2032C61.1582 25.1964 70.7173 34.3739 70.7067 45.5795H70.7031ZM49.4993 38.7727C45.6141 38.7693 42.4325 41.8115 42.4254 45.5421C42.4219 49.2694 45.6 52.3252 49.478 52.332C53.3561 52.3353 56.5484 49.2796 56.5519 45.5625C56.5554 41.8352 53.3773 38.7795 49.4957 38.7761L49.4993 38.7727Z"
                          fill="#777777"
                        />
                      </svg>)}
                    </label> */}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      name="pic"
                    />
                  </div>
                </div>
                {/* 輸入框 */}
                <div className="col-12 col-lg-8 mt-2">
                  <input type='hidden' name='MemberID' value={memberID}></input>
                  <label htmlFor="name" className="form-control-label m-2">
                    真實姓名<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="text" className="form-control" name='RealName' required/>
                  <label htmlFor="name" className="form-control-label m-2">
                    證照編號<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="text" className="form-control" name='Certificateid' required />
                  <label htmlFor="name" className="form-control-label m-2">
                    取證日期<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input type="date" className="form-control" name='CertificateDate' required />
                </div>
                {/* 按鈕 */}
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                  <button className="submit-btn" type='submit'>送出</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
