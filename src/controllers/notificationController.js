import { Notification } from "../models/notification.js";
// (Optional) import { Member } from "../models/member.js";

// Create notification
const createNotification = async (req, res) => {
  try {
    const { memberId, message, type } = req.body;

    // Optional: validate member existence
    // const member = await Member.findById(memberId);
    // if (!member) {
    //   return res.status(404).json({ success: false, message: "Member not found" });
    // }

    const newNotification = await Notification.create({
      memberId,
      message,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: newNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate(
      "memberId",
      "userId age contact" // ✅ ensure these fields exist in Member schema
    );

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get notifications for a specific member
const getNotificationsByMember = async (req, res) => {
  try {
    const notifications = await Notification.find({
      memberId: req.params.memberId,
    });

    res.status(200).json({
      success: true,
      message: `Notifications for member ${req.params.memberId}`,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export {
  createNotification,
  getAllNotifications,
  getNotificationsByMember,
  deleteNotification,
};
