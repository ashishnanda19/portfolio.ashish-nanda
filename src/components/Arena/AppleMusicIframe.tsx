export default function AppleMusicIframe() {
  return (
    <div className="flex justify-center ">
      <iframe
        className="min-w-full md:min-w-1/2"
        data-testid="embed-iframe"
        style={{ borderRadius: "12px", border: "none" }}
        src="https://embed.music.apple.com/in/playlist/dikhe-na-koi-disha/pl.u-DdANrpPs0Pa4gJA"
        height="450"
        allow="autoplay *; encrypted-media *; clipboard-write"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
}
