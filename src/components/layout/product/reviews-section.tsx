"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  CheckCircle2,
  UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Types ---

interface ReviewReply {
  id: string;
  author: string;
  isBrand?: boolean;
  date: string;
  content: string;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  date: string;
  rating: number;
  title: string;
  content: string;
  fitContext?: string;
  images?: string[];
  helpfulCount: number;
  replies?: ReviewReply[];
}

interface ReviewsSectionProps {
  productId: string;
  productName: string;
  initialReviews?: Review[];
}

// --- Mock Data ---

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Elena M.",
    verified: true,
    date: "October 12, 2023",
    rating: 5,
    title: "Absolutely stunning dress, incredible fit",
    content:
      "I rented this for a black-tie gala and received compliments all night. The fabric has a beautiful weight to it that makes it drape perfectly. I was a bit worried about the sizing but it fit like a glove. Will definitely be renting again!",
    fitContext: "Usually wears FR 36, chose FR 36. True to size.",
    helpfulCount: 24,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNyTlMnJ9pQswrknguZl__w7yDQ3Sm3N2sLRsNRxrTEYn29Xl2prcM2oDmnBtE50Ys9kdptItsKwI8enL7SVqwjLBkIwHTZB7vygwTbh_omS2hPl12NcBjxpvts56-fa7SL08oVL7YXHNfd9kBI8oi9kSStDB4CnxE_kqnhmPwLaEMYeG8Y8xO9ATCN-NPomIYdfSv97vZXVzhzSOM7bKqLEw-uVZi0YIpfeJiUlrpzPZWL6aZGhr8SgXipc4BG4m2y75BWDiOgKod",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBLfA_oFc0i8MyhBwvxmJZSOHQlc7K1vYjI4-2iW99mSocIHv8XE-Ls2p40zMjxYCgvM8f0c1ZHzdlM4qNqm9D4E69_Xt4u_Zn6LuBCv53ZuzfqaZNGefwNLIQtm8q08wTdH0NeBGF91748QvCywG59AZDh0WCE1Wu1JLKv44XMPAUJxK8iYxGUcbCD-dbOwqVtco-B4KUrvpDm0WPj1gmB8W2GE5-rxBcVNe22KRc_3U1neyKnnaNRv3CGXyUXIq97_WGN57mB4CN",
    ],
    replies: [
      {
        id: "rep1",
        author: "Startup Loop Stylist",
        isBrand: true,
        date: "October 14, 2023",
        content:
          "Elena, we are so thrilled to hear you felt amazing at your gala! This silhouette truly is a masterpiece. We look forward to styling your next event.",
      },
    ],
  },
  {
    id: "r2",
    author: "Sarah K.",
    verified: true,
    date: "September 28, 2023",
    rating: 4,
    title: "Beautiful but runs slightly long",
    content:
      "The detail on this piece is breathtaking. The only reason for 4 stars is that even with heels, it was a bit long on me (I'm 5'4\"). I recommend checking the measurements carefully if you are petite.",
    fitContext: "Usually wears FR 34, chose FR 34. Slightly large/long.",
    helpfulCount: 12,
  },
  {
    id: "r3",
    author: "Chloe T.",
    verified: false,
    date: "August 15, 2023",
    rating: 5,
    title: "A showstopper!",
    content:
      "Wore this to my best friend's wedding in Italy. The material breathes surprisingly well and the condition was pristine. The return process was incredibly easy too.",
    helpfulCount: 8,
    replies: [
      {
        id: "rep2",
        author: "Jessica R.",
        isBrand: false,
        date: "August 16, 2023",
        content:
          "Hi Chloe! I'm attending a summer wedding next year. Did you feel the fabric was prone to wrinkling during transit?",
      },
      {
        id: "rep3",
        author: "Chloe T.",
        isBrand: false,
        date: "August 18, 2023",
        content:
          "Hey Jessica! It arrived perfectly pressed. I hung it up in the bathroom while showering to let steam release any minor creases from the garment bag, and it looked flawless.",
      },
    ],
  },
];

// --- Components ---

function StarRating({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-${size} w-${size} ${
            star <= rating
              ? "fill-brand-accent text-brand-accent"
              : "text-border-color fill-none"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<ReviewReply[]>(review.replies || []);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: ReviewReply = {
      id: `rep_new_${Date.now()}`,
      author: "You",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      content: replyText.trim(),
    };

    setReplies([...replies, newReply]);
    setReplyText("");
    setShowReplyForm(false);
  };

  return (
    <div className="py-8 border-b border-border-color last:border-0 hover:bg-surface/10 transition-colors">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Reviewer Info */}
        <div className="w-full md:w-1/4 shrink-0">
          <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-surface rounded-full flex items-center justify-center text-text-muted">
              <UserCircle2 className="w-full h-full opacity-50" />
            </div>
            <div>
              <p className="font-bold text-sm text-text-main flex items-center gap-1.5">
                {review.author}
                {review.verified && (
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-brand-accent"
                    aria-label="Verified Renter"
                  />
                )}
              </p>
              {review.verified && (
                <p className="text-[10px] uppercase tracking-widest text-text-muted mt-0.5">
                  Verified Renter
                </p>
              )}
            </div>
          </div>
          {review.fitContext && (
            <div className="mt-4 p-3 bg-surface text-xs font-sans text-text-main/80 rounded-sm">
              <p className="font-bold uppercase tracking-wider text-[10px] text-text-muted mb-1">
                Fit & Sizing
              </p>
              {review.fitContext}
            </div>
          )}
        </div>

        {/* Right Column: Review Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <StarRating rating={review.rating} />
              <h4 className="font-serif text-lg md:text-xl font-medium text-text-main mt-2">
                {review.title}
              </h4>
            </div>
            <span className="text-xs text-text-muted font-sans shrink-0 ml-4">
              {review.date}
            </span>
          </div>

          <p className="text-sm font-sans text-text-main/80 leading-relaxed mb-6">
            {review.content}
          </p>

          {/* Image Gallery */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 snap-x">
              {review.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-32 md:w-32 md:h-40 shrink-0 snap-start group cursor-zoom-in"
                >
                  <Image
                    src={img}
                    alt={`Review image by ${review.author}`}
                    fill
                    className="object-cover border border-border-color transition-opacity group-hover:opacity-90"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border-color/50">
            <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-brand-primary transition-colors uppercase tracking-widest font-bold">
              <ThumbsUp className="w-3.5 h-3.5" />
              Helpful ({review.helpfulCount})
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-brand-primary transition-colors uppercase tracking-widest font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Reply {replies.length > 0 && `(${replies.length})`}
            </button>
            <button
              className="ml-auto text-text-muted hover:text-brand-primary transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4 p-4 bg-surface/50 border border-border-color">
              <h5 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-3">
                Leave a reply
              </h5>
              <form onSubmit={handleReplySubmit}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${review.author}...`}
                  className="w-full bg-background border border-border-color p-3 text-sm font-sans focus:outline-none focus:border-brand-primary min-h-[80px] resize-y"
                  required
                />
                <div className="flex justify-end mt-3 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReplyForm(false)}
                    className="text-xs uppercase tracking-widest h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-brand-primary text-background text-xs uppercase tracking-widest h-8 hover:bg-brand-accent"
                  >
                    Post Reply
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Replies Thread */}
          {replies.length > 0 && (
            <div className="mt-6 ml-4 md:ml-8 pl-4 border-l-2 border-border-color flex flex-col gap-5">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-surface/30 p-4 rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-xs text-text-main flex items-center gap-2">
                      {reply.author}
                      {reply.isBrand && (
                        <span className="bg-brand-primary text-background text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                          Brand
                        </span>
                      )}
                    </p>
                    <span className="text-[10px] text-text-muted font-sans">
                      {reply.date}
                    </span>
                  </div>
                  <p className="text-sm font-sans text-text-main/80 leading-relaxed">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection({
  productId,
  productName,
  initialReviews = MOCK_REVIEWS,
}: ReviewsSectionProps) {
  const reviews = initialReviews;
  const totalReviews = reviews.length;
  // Calculate average rating
  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <section
      id="reviews"
      data-product-id={productId}
      className="bg-background-light py-16 md:py-24 border-t border-border-color scroll-mt-[112px]"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-text-main mb-6">
              Object Reviews
            </h2>
            <div className="flex items-center gap-4">
              <span className="font-serif text-5xl md:text-6xl text-text-main leading-none">
                {avgRating}
              </span>
              <div className="flex flex-col gap-1">
                <StarRating rating={parseFloat(avgRating)} size={5} />
                <span className="text-xs uppercase tracking-widest text-text-muted font-bold">
                  Based on {totalReviews} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-start md:items-end gap-4">
            <Button className="bg-brand-primary text-background hover:bg-brand-accent px-8 py-6 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-transform hover:scale-105">
              Write a Review
            </Button>
            <p className="text-xs text-text-muted">
              Share your thoughts on the {productName}
            </p>
          </div>
        </div>

        {/* Filters/Sort Bar (Visual only for mock) */}
        <div className="flex justify-between items-center py-4 border-y border-border-color mb-8">
          <div className="flex gap-4">
            <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 text-brand-primary hover:text-brand-accent transition-colors">
              All Reviews
            </button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-primary transition-colors">
              With Photos
            </button>
          </div>
          <div>
            <select className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer">
              <option>Sort by: Most Helpful</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Review List */}
        <div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <p className="py-12 text-center text-text-muted font-sans text-sm">
              No reviews yet. Be the first to review this object.
            </p>
          )}
        </div>

        {totalReviews > reviews.length && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-surface uppercase tracking-widest text-xs font-bold w-full sm:w-auto px-12 py-6 rounded-none"
            >
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
