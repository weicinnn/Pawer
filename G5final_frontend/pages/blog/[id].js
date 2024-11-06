import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Components
import LatestCard from '@/components/sidebar/latest-post/latest-post';
import Banner from '@/components/join/banner/banner';
import POPCard from '@/components/blog/pop-post/pop-post';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CreateBtn from '@/components/blog/create-btn/create-btn';
import BlogDetail from '@/components/blog/blog-post/blog-Detail';

export default function BlogPost(props) {
  const [blogData, setBlogData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3005/api/blog/${id}`);
        const data = await response.json();
        setBlogData(data[0]);
        console.log('成功讀取資料', data);

        // if (Array.isArray(data) && data.length > 0) {
        //   setBlogData(data[0])
        // } else {
        //   console.error('資料格式不正確')
        // }
      } catch (error) {
        console.error('無法獲取資料:', error);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!blogData) return <p>文章已下架</p>;

  return (
    <div className="bl-post">
      <Banner bgImgUrl="/blog/blog-banner.svg" />
      <div className="post-container container">
        <Breadcrumbs className="breadcrumb" />
        <div className="main-section">
          <BlogDetail
            title={blogData.Title ? blogData.Title : ''}
            blogImg={blogData.blogImg}
            content={blogData.Content}
            tags={blogData.tags ? blogData.tags.split(',') : []}
            updateDate={blogData.UpdateDate}
            likeCount={blogData.likeCount}
            favoriteCount={blogData.favoriteCount}
            id={blogData.ID}
            maxId={blogData.ID}
            avatar={blogData.MemberAvatar}
            name={blogData.Nickname}
          />
          {/* 側邊欄 */}
          <div className="sidebar">
            <div className="btn-sec">
              <button className="btn btn-primary my-blog m-none">
                我的部落格
              </button>
              <CreateBtn btnName={'建立文章'} />
            </div>
            {/* <div className="s-card">
              <SearchBar />
            </div> */}
            {/* <div className="m-none">
              <TagCard />
            </div> */}
            <div className="m-none">
              <LatestCard />
            </div>
            <div className="m-none">
              <POPCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
