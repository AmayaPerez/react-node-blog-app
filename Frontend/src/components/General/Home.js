import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonPost from "../Skeletons/SkeletonPost";
import CardPost from "../Post/CardPost";
import NoPosts from "../Post/NoPosts";
import Pagination from "./Pagination";
import "../../Css/Home.css"

import { useNavigate } from "react-router-dom"
const Home = () => {
  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);


  useEffect(() => {
    const getPosts = async () => {

      setLoading(true)
      try {

        const { data } = await axios.get(`/post/getAllPosts?search=${searchKey || ""}&page=${page}`)

        if (searchKey) {
          navigate({
            pathname: '/',
            search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
          });
        }
        else {
          navigate({
            pathname: '/',
            search: `${page > 1 ? `page=${page}` : ""}`,
          });


        }
        setPosts(data.data)
        setPages(data.pages)

        setLoading(false)
      }
      catch (error) {
        setLoading(true)
      }
    }
    getPosts()
  }, [setLoading, search, page, navigate])


  useEffect(() => {
    setPage(1)
  }, [searchKey])


  return (
    <div className="Inclusive-home-page">
      {loading ?

        <div className="skeleton_emp">
          {
            [...Array(6)].map(() => {
              return (
                // theme dark :> default : light
                <SkeletonPost key={uuidv4()} />
              )
            })}
        </div>

        :
        <div>
          <div className="post-card-wrapper">
            {posts?.length !== 0 ?
              posts?.map((post) => {
                return (
                  <CardPost key={uuidv4()} post={post} />
                )
              }) : <NoPosts />
            }
      
          </div>

          <Pagination page={page} pages={pages} changePage={setPage} />

        </div>

      }
      <br />
    </div>

  )

};

export default Home;