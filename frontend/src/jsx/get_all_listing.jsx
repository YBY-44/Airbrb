import { callAPIget } from './API';
import React, { useState, useEffect } from 'react';

export const GetAllListing = () => {
  const [data, setData] = useState([]); // 初始化一个状态来存储从后端获取的数据
  const [isLoading, setIsLoading] = useState(true); // 初始化一个状态来表示数据是否正在加载

  useEffect(() => {
    // 在组件挂载时或其他适当的生命周期中从后端获取数据
    // 你可以使用axios、fetch或其他方法来获取数据
    callAPIget('listings', null)
      .then((response) => {
        setData(response);
        setIsLoading(false); // 数据加载完成后设置isLoading为false
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // 如果发生错误，也需要设置isLoading为false
      });
  }, []);

  let content;

  if (isLoading) {
    // 如果数据正在加载，显示加载中信息
    content = <p>Loading...</p>;
  } else if (data.length > 0) {
    // 如果数据已加载并且不为空，渲染数据
    content = data.map((item, index) => (
      <div key={index}>
        {/* 在这里渲染每条数据 */}
        <p>{item.someProperty}</p>
        {/* 添加其他需要显示的数据 */}
      </div>
    ));
  } else {
    // 如果数据为空，显示一个提示
    content = <p>NULL</p>;
  }

  return <div>{content}</div>;
};
