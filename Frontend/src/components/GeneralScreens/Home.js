import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";
import "../../Css/Home.css"

import { useNavigate } from "react-router-dom"
const Home = () => {
  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);


  useEffect(() => {
    const getStories = async () => {

      setLoading(true)
      try {

        const { data } = await axios.get(`/story/getAllStories?search=${searchKey || ""}&page=${page}`)

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
        setStories(data.data)
        setPages(data.pages)

        setLoading(false)
      }
      catch (error) {
        setLoading(true)
      }
    }
    getStories()
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
                <SkeletonStory key={uuidv4()} />
              )
            })}
        </div>

        :
        <div>
          <div className="story-card-wrapper">
            {stories.length !== 0 ?
              stories.map((story) => {
                return (
                  <CardStory key={uuidv4()} story={story} />
                )
              }) : <NoStories />
            }
            <img className="bg-planet-svg" src="https://img.freepik.com/free-vector/cloud-flat-style_78370-5497.jpg?t=st=1718207183~exp=1718210783~hmac=255932bf2e8d990a6c0b3b37c56eb32aa0efcc360c5ae5da9e05711139bdad22&w=740" alt="planet" />
            <img className="bg-planet2-svg" src="https://img.freepik.com/free-vector/cloud-flat-style_78370-5497.jpg?t=st=1718207183~exp=1718210783~hmac=255932bf2e8d990a6c0b3b37c56eb32aa0efcc360c5ae5da9e05711139bdad22&w=740" alt="planet" />
            <img className="bg-planet3-svg" src="https://img.freepik.com/free-vector/cloud-flat-style_78370-5497.jpg?t=st=1718207183~exp=1718210783~hmac=255932bf2e8d990a6c0b3b37c56eb32aa0efcc360c5ae5da9e05711139bdad22&w=740" alt="planet" />

          </div>

          <Pagination page={page} pages={pages} changePage={setPage} />

        </div>

      }
      <br />
    </div>

  )

};

export default Home;