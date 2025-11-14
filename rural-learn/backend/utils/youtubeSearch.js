const axios = require('axios');

class YouTubeSearch {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  async searchVideos(query, maxResults = 5) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: query + ' tutorial educational',
          type: 'video',
          maxResults: maxResults,
          order: 'relevance',
          videoDuration: 'medium',
          key: this.apiKey
        }
      });

      const videos = response.data.items.map(item => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description
      }));

      return videos;
    } catch (error) {
      console.error('YouTube search error:', error);
      return [];
    }
  }

  async getVideoDetails(videoId) {
    try {
      const response = await axios.get(`${this.baseUrl}/videos`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId,
          key: this.apiKey
        }
      });

      const video = response.data.items[0];
      return {
        title: video.snippet.title,
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        description: video.snippet.description,
        tags: video.snippet.tags || []
      };
    } catch (error) {
      console.error('Video details error:', error);
      return null;
    }
  }

  async searchEducationalContent(topic, level = 'beginner') {
    const queries = [
      `${topic} ${level} tutorial`,
      `${topic} explained simply`,
      `learn ${topic} step by step`,
      `${topic} for beginners`
    ];

    const allVideos = [];
    for (const query of queries) {
      const videos = await this.searchVideos(query, 3);
      allVideos.push(...videos);
    }

    // Remove duplicates and return top 10
    const uniqueVideos = allVideos.filter((video, index, self) => 
      index === self.findIndex(v => v.url === video.url)
    );

    return uniqueVideos.slice(0, 10);
  }
}

module.exports = new YouTubeSearch();