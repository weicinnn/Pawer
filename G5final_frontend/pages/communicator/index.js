import React, { useState, useEffect } from 'react';
import Banner from '@/components/join/banner/banner';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Image from 'next/image';
import { usePagination } from '@/hooks/usePagination';
import { PerPageDom } from '@/components/PerPageDom';
import { SortDom } from '@/components/SortDom';
import { PageNav } from '@/components/PageNav';
import Link from 'next/link';

export default function communicator(props) {
  const {
    nowPageItems,
    nowPage,
    totalPage,
    itemsperPage,
    sort,
    next,
    prev,
    choosePerpage,
    chooseSort,
  } = usePagination({ url: 'http://localhost:3005/api/pet', onDataChange: handleDataChange });

  // 當子元件產生變化時重新抓取資料
  function handleDataChange(data) {
  }

  return (
    <>
      <div className="PT-list">
        {/* banner */}
        <Banner title="萌寵揪團聚會" bgImgUrl="/pet/images/Banner.jpg" />
        {/* 主要內容 */}
        <div className="container py-2">
          {/* 麵包屑 */}
          <Breadcrumbs />
          {/* 搜尋框 */}
          <div className="row d-flex py-2 justify-content-center">
            <div className="col-8">
              <form className="pet-searchbar-yen" action="">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={40}
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.9872 29.3001C25.2828 29.3001 30.2414 24.3935 30.2414 18.5168C30.2414 12.64 25.2828 7.73344 18.9872 7.73344C12.6916 7.73344 7.73307 12.64 7.73307 18.5168C7.73307 24.3935 12.6916 29.3001 18.9872 29.3001ZM18.9872 31.7001C26.5282 31.7001 32.6414 25.7977 32.6414 18.5168C32.6414 11.2358 26.5282 5.33344 18.9872 5.33344C11.4462 5.33344 5.33307 11.2358 5.33307 18.5168C5.33307 25.7977 11.4462 31.7001 18.9872 31.7001Z"
                      fill="#B1B1B1"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.0262 27.0847C28.4948 26.6161 29.2546 26.6161 29.7232 27.0847L36.3149 33.6764C36.7835 34.145 36.7835 34.9048 36.3149 35.3734C35.8463 35.8421 35.0865 35.8421 34.6178 35.3734L28.0262 28.7818C27.5576 28.3132 27.5576 27.5534 28.0262 27.0847Z"
                      fill="#B1B1B1"
                    />
                  </svg>
                </button>
                <input type="text" placeholder="請輸入溝通師名稱" />
              </form>
            </div>
          </div>
          {/* 排序.每頁筆數 */}
          <div className='row'>
          <div className='col-6'>
            <PerPageDom itemsperPage={itemsperPage} choosePerpage={choosePerpage} />
          </div>
          <div className='col-6'>
            <SortDom sort={sort} chooseSort={chooseSort} />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            {/* 師資列表*/}
            {nowPageItems.map((v) => { 
              return (
                <Link
                className="col-lg-4 col-6 no-underline g-1 g-sm-4"
                href={`/communicator/${v.ID}`}
                key={v.ID}
                passHref
              >
                <div className="pet-teachercard-yen position-relative" key={v.ID}>
                  <Image
                    className="imgg"
                    src={`/pet/images/${v.Img}`}
                    alt="1"
                    width={400}
                    height={300}
                  />
                  <div className="contain">
                    <h4>{v.Name}</h4>
                    <p className="text">
                      證書編號：
                      <br />
                      {v.Certificateid}
                    </p>
                    <p className="text">
                      通過日期：
                      <br />
                      {v.CertificateDate}
                    </p>
                    <p className="hover-btn">我要預約</p>
                  </div>
                  <div className="contain-hover">
                    <p className="text-center f">Hi, 我是{v.Name}</p>
                    <div className="">
                      <p>
                        服務項目：
                        <br />
                        {v.Service}
                      </p>
                      <p className="">
                        進行方式：
                        <br />
                        {v.Approach}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>)
              
            })}
          </div>
          {/* 分頁 */}
          <div className="d-flex justify-content-center">
            <PageNav nowPage={nowPage} totalPage={totalPage} next={next} prev={prev} />
          </div>
        </div>
        {/* 廣告 */}
        <div className="pet-advertise-yen py-5 px-5">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-4">
                <div className="advertise-Image">
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/1.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/2.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/3.png"
                    alt="1"
                  />
                  <Image
                    className="Image-none"
                    width="100"
                    height="100"
                    src="/pet/images/4.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/5.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/6.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/7.png"
                    alt="1"
                  />
                  <Image
                    className="Image-none"
                    width="100"
                    height="100"
                    src="/pet/images/8.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/9.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/10.png"
                    alt="1"
                  />
                  <Image
                    width="100"
                    height="100"
                    src="/pet/images/11.png"
                    alt="1"
                  />
                  <Image
                    className="Image-none"
                    width="100"
                    height="100"
                    src="/pet/images/12.png"
                    alt="1"
                  />
                </div>
              </div>
              <div className="col-lg-8 mt-3">
                <div className="">
                  <h3 className="text-white my-2">Become a Pet Communicator</h3>
                  <p className="text-white">
                    寵物溝通師擁有神奇的魔力，只要透過一張照片，就能解讀寵物內心真實的想法，讓飼主得到解答。甚至已離世的寵物，也能夠接收到牠們生前想對飼主說的話寵物內心世界有夠難猜！
                    <br />
                    <br />
                    家裡的兔子為什麼突然不喜歡吃飼料了？貓貓總是到處亂尿尿、狗狗狂吠一整晚害我睡不好….毛小孩到底在想什麼？成為寵物溝通師,幫助毛小孩的爸媽們了解牠們的內心吧！
                  </p>
                  <button className="pet-btnApply-yen">
                    申請成為寵物溝通師{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={14}
                      viewBox="0 0 23 14"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.726258 0.539754C1.2878 0.0978 2.12237 0.169455 2.59032 0.6998L11.5 10.7974L20.4097 0.6998C20.8776 0.169455 21.7122 0.0978 22.2737 0.539754C22.8353 0.981708 22.9112 1.76991 22.4432 2.30026L12.5168 13.5502C12.2653 13.8352 11.8928 14 11.5 14C11.1072 14 10.7347 13.8352 10.4832 13.5502L0.556798 2.30026C0.0888472 1.76991 0.164717 0.981708 0.726258 0.539754Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
