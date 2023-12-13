import { PostDetails } from "../../components/screens/post-details";
import { fetchSectionContent } from '../../utils/fetchSectionContent';
import { fetchRandomBatchOfPosts } from '../../utils/fetchRandomBatchOfPosts';
import { parse } from 'node-html-parser';

export default function PostDetailsPage({ postDetailsData, contactSection, randomPosts, error }) {

  const contactSectionParsed = parse(contactSection.content.rendered);
  const contactSectionText = contactSectionParsed.querySelector('p')?.innerText;
  const contactSectionButtonText = contactSectionParsed.querySelector('.wp-block-button__link')?.innerText;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PostDetails
      postDetailsData={postDetailsData}
      contactSectionText={contactSectionText}
      contactSectionButtonText={contactSectionButtonText}
      randomPosts={randomPosts}
    />
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params; // Get the post ID from the URL

  try {
    // Fetch post by ID
    const postRes = await fetch(`${process.env.WP_REST_URL}/wp-json/wp/v2/posts/${id}?_embed`);
    const postData = await postRes.json();

    // Fetch post category name
    const categoryId = postData.categories[0] || undefined;
    const categoryRes = await fetch(`${process.env.WP_REST_URL}/wp-json/wp/v2/categories/${categoryId}`);
    const categoryData = await categoryRes.json();

    const randomPostsBatch = await fetchRandomBatchOfPosts(6);
    const contactSection = await fetchSectionContent('contact_section');

    const postDetailsData = {
      ...postData,
      categoryName: categoryData.name
    };

    return {
      props: {
        postDetailsData,
        randomPosts: randomPostsBatch,
        contactSection
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps: ", error);
    return {
      props: {
        postDetailsData: null,
        contactSection: null,
        error: "An error occurred while loading the page."
      },
    };
  }
}
