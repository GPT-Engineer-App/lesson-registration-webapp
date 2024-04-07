import { useState } from "react";
import { Box, Heading, Text, Button, Flex, Input, Textarea, Image, IconButton, useToast } from "@chakra-ui/react";
import { FaHeart, FaComment, FaBookmark, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Article 1",
      content: "This is the content of article 1",
      likes: 10,
      comments: [
        { id: 1, text: "Great article!" },
        { id: 2, text: "I learned a lot from this." },
      ],
    },
    {
      id: 2,
      title: "Article 2",
      content: "This is the content of article 2",
      likes: 5,
      comments: [{ id: 3, text: "Well written!" }],
    },
  ]);
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Lesson 1",
      description: "This is lesson 1",
      instructor: "John Doe",
      participants: ["Jane Smith", "Mike Johnson"],
    },
    {
      id: 2,
      title: "Lesson 2",
      description: "This is lesson 2",
      instructor: "Jane Smith",
      participants: ["John Doe"],
    },
  ]);
  const toast = useToast();

  const handleLogin = () => {
    // TODO: Implement actual login
    setIsLoggedIn(true);
    toast({
      title: "Logged in",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    // TODO: Implement actual logout
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSignup = () => {
    // TODO: Implement actual signup
    toast({
      title: "Signed up",
      description: "Your account has been created",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePostArticle = (title, content) => {
    // TODO: Implement actual article posting
    const newArticle = {
      id: articles.length + 1,
      title,
      content,
      likes: 0,
      comments: [],
    };
    setArticles([...articles, newArticle]);
    toast({
      title: "Article posted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLikeArticle = (articleId) => {
    // TODO: Implement actual article liking
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        return { ...article, likes: article.likes + 1 };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const handleFavoriteArticle = (articleId) => {
    // TODO: Implement actual favorite article registration
    toast({
      title: "Article favorited",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCommentArticle = (articleId, commentText) => {
    // TODO: Implement actual article commenting
    const newComment = {
      id: Math.random(),
      text: commentText,
    };
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        return { ...article, comments: [...article.comments, newComment] };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const handleRegisterLesson = (title, description, instructor) => {
    // TODO: Implement actual lesson registration
    const newLesson = {
      id: lessons.length + 1,
      title,
      description,
      instructor,
      participants: [],
    };
    setLessons([...lessons, newLesson]);
    toast({
      title: "Lesson registered",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleJoinLesson = (lessonId) => {
    // TODO: Implement actual lesson joining
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return { ...lesson, participants: [...lesson.participants, "Current User"] };
      }
      return lesson;
    });
    setLessons(updatedLessons);
    toast({
      title: "Joined lesson",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" mb={8}>
        <Heading as="h1" size="xl">
          My App
        </Heading>
        <Flex>
          {isLoggedIn ? (
            <>
              <Button leftIcon={<FaSignOutAlt />} onClick={handleLogout} mr={4}>
                Logout
              </Button>
              <Button leftIcon={<FaUserPlus />} onClick={handleSignup}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
              Login
            </Button>
          )}
        </Flex>
      </Flex>

      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Articles
        </Heading>
        {articles.map((article) => (
          <Box key={article.id} p={4} borderWidth={1} mb={4}>
            <Heading as="h3" size="md" mb={2}>
              {article.title}
            </Heading>
            <Text mb={4}>{article.content}</Text>
            <Flex align="center">
              <IconButton icon={<FaHeart />} onClick={() => handleLikeArticle(article.id)} variant="ghost" mr={2} />
              <Text mr={4}>{article.likes} likes</Text>
              <IconButton icon={<FaBookmark />} onClick={() => handleFavoriteArticle(article.id)} variant="ghost" mr={2} />
              <Text>Favorite</Text>
            </Flex>
            <Box mt={4}>
              <Heading as="h4" size="sm" mb={2}>
                Comments
              </Heading>
              {article.comments.map((comment) => (
                <Box key={comment.id} mb={2}>
                  <Text>{comment.text}</Text>
                </Box>
              ))}
              <Flex mt={2}>
                <Input
                  placeholder="Add a comment"
                  mr={2}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCommentArticle(article.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <IconButton
                  icon={<FaComment />}
                  onClick={() => {
                    const commentText = document.querySelector(`#article-${article.id}-comment`).value;
                    handleCommentArticle(article.id, commentText);
                    document.querySelector(`#article-${article.id}-comment`).value = "";
                  }}
                  variant="ghost"
                />
              </Flex>
            </Box>
          </Box>
        ))}
        {isLoggedIn && (
          <Box mt={8}>
            <Heading as="h3" size="md" mb={2}>
              Post an Article
            </Heading>
            <Input placeholder="Title" mb={2} id="new-article-title" />
            <Textarea placeholder="Content" mb={2} id="new-article-content" />
            <Button
              onClick={() => {
                const title = document.querySelector("#new-article-title").value;
                const content = document.querySelector("#new-article-content").value;
                handlePostArticle(title, content);
                document.querySelector("#new-article-title").value = "";
                document.querySelector("#new-article-content").value = "";
              }}
            >
              Post Article
            </Button>
          </Box>
        )}
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Lessons
        </Heading>
        {lessons.map((lesson) => (
          <Box key={lesson.id} p={4} borderWidth={1} mb={4}>
            <Heading as="h3" size="md" mb={2}>
              {lesson.title}
            </Heading>
            <Text mb={2}>{lesson.description}</Text>
            <Text mb={2}>Instructor: {lesson.instructor}</Text>
            <Text mb={4}>Participants: {lesson.participants.join(", ")}</Text>
            <Button onClick={() => handleJoinLesson(lesson.id)}>Join Lesson</Button>
          </Box>
        ))}
        {isLoggedIn && (
          <Box mt={8}>
            <Heading as="h3" size="md" mb={2}>
              Register a Lesson
            </Heading>
            <Input placeholder="Title" mb={2} id="new-lesson-title" />
            <Textarea placeholder="Description" mb={2} id="new-lesson-description" />
            <Input placeholder="Instructor" mb={2} id="new-lesson-instructor" />
            <Button
              onClick={() => {
                const title = document.querySelector("#new-lesson-title").value;
                const description = document.querySelector("#new-lesson-description").value;
                const instructor = document.querySelector("#new-lesson-instructor").value;
                handleRegisterLesson(title, description, instructor);
                document.querySelector("#new-lesson-title").value = "";
                document.querySelector("#new-lesson-description").value = "";
                document.querySelector("#new-lesson-instructor").value = "";
              }}
            >
              Register Lesson
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Index;
