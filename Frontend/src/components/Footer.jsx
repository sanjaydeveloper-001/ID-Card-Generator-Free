import { FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi";
import { BiLogoGmail } from "react-icons/bi";
import { useState } from "react";

function Footer() {
  const [formStatus, setFormStatus] = useState("");
  const [formData, setFormData] = useState({ comment: "" });

  const handleChange = (e) => setFormData({ comment: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");
    try {
      const response = await fetch("https://formspree.io/f/myzjkykd", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      setFormStatus(response.ok ? "Thank you for your feedback!" : "Oops! Something went wrong.");
      setFormData({ comment: "" });
    } catch {
      setFormStatus("Error submitting form.");
    }
  };

  return (
    <footer className="w-full bg-blue-200/70 flex flex-col md:flex-row justify-between items-start gap-10 py-12 px-6 sm:px-10 md:px-20 lg:px-20 mx-auto">
      
      {/* Feedback */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h1 className="font-bold text-2xl sm:text-3xl">Give Feedback 😍</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            className="outline-none border rounded-md p-3 resize-none text-sm sm:text-base"
            name="comment"
            rows="3"
            placeholder="Type your feedback..."
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-fit text-sm sm:text-base">
            Send Feedback
          </button>
          <span className={`text-sm ${formStatus.includes('Thank') ? 'text-green-500' : 'text-red-500'}`}>{formStatus}</span>
        </form>
      </div>

      {/* Contact */}
      <div className="w-full md:w-1/2 lg:mt-10 md:items-end flex flex-col text-center md:text-left">
        <h1 className="font-bold text-2xl sm:text-3xl">Contact Us</h1>
        <ul className="flex justify-center md:justify-start mt-3 gap-5 text-blue-600 text-2xl">
          <a href="https://www.linkedin.com/in/josanweb/" target="_blank"><FiLinkedin /></a>
          <a href="https://github.com/sanjaydeveloper-001" target="_blank"><FiGithub /></a>
          <a href="mailto:josephstudent001@gmail.com"><BiLogoGmail /></a>
          <a href="https://x.com/Sanjay_dev_001" target="_blank"><FiTwitter /></a>
        </ul>
        <p className="text-sm mt-8">© 2025 ID Card Generator. Built with ❤️ by Sanjay</p>
      </div>
    </footer>
  );
}

export default Footer;
