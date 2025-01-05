const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Failed to log out", error: err });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res
          .status(500)
          .json({ message: "Failed to destroy session", error: err });
      }

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.status(200).json({ message: "Logged out successfully!" });
    });
  });
});

module.exports = router;
