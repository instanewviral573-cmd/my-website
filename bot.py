from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

BOT_TOKEN = "8548372263:AAH9aIoxR7h3gKBb8fjkv8I9PQfFfY2YJnM"

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

# 1️⃣ START COMMAND
@dp.message_handler(commands=["start"])
async def start_handler(message: types.Message):
    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(
        types.InlineKeyboardButton(
            text="▶️ Continue",
            callback_data="continue"
        )
    )

    await message.answer(
        "👋 Welcome!\n\n"
        "You can download the video using this bot.\n"
        "Click Continue to proceed.",
        reply_markup=keyboard
    )

# 2️⃣ CONTINUE BUTTON
@dp.callback_query_handler(lambda c: c.data == "continue")
async def continue_handler(callback_query: types.CallbackQuery):
    keyboard = types.InlineKeyboardMarkup(row_width=1)
    # Option A: External Download Link (Recommended)
    keyboard.add(
        types.InlineKeyboardButton(
            text="⬇️ Download Video",
            url="https://your-video-download-link.com"
        )
    )
    # Option B: Alternative download method (uncomment to enable)
    # keyboard.insert(
    #     types.InlineKeyboardButton(
    #         text="📁 Direct File",
    #         callback_data="send_video_file"
    #     )
    # )

    await callback_query.message.edit_text(
        "Your video is ready 👇\n\nChoose your download option:",
        reply_markup=keyboard
    )


# 3️⃣ SEND VIDEO FILE OPTION (Alternative)
# Uncomment the following handler if you want to send video files directly
# @dp.callback_query_handler(lambda c: c.data == "send_video_file")
# async def send_video_handler(callback_query: types.CallbackQuery):
#     await callback_query.message.answer("Sending video file...")
#     # Option B: Upload Video File to Telegram
#     # await bot.send_video(
#     #     chat_id=callback_query.message.chat.id,
#     #     video=open("video.mp4", "rb")
#     # )
#     
#     # Option C: Cloud Link (Google Drive, Dropbox, etc.)
#     cloud_link = "https://drive.google.com/your-video-link"
#     await callback_query.message.answer(f"Download from cloud: {cloud_link}")

if __name__ == "__main__":
    executor.start_polling(dp)