# Image Upload Feature Guide

## Overview
Your portfolio now supports **uploading images directly** through the admin panel! No need to manually enter URLs anymore.

## How to Use

### 1. Login to Admin Panel
- Go to: http://localhost:3000/admin (locally) or your deployed URL
- Login with: `admin` / `admin123`

### 2. Upload Profile Image
1. Click on the **"Profile & About"** tab
2. Find the **"Profile Image"** section
3. Click the **"Upload Image"** button
4. Select any image from your computer (JPG, PNG, GIF, etc.)
5. The image will upload automatically and show a preview
6. Click **"Save Changes"** to update your profile
7. Your image is now live on your portfolio!

## Features

✅ **Easy Upload**: Just click and select - no URL needed  
✅ **Image Preview**: See your image before saving  
✅ **File Validation**: Only image files accepted (max 5MB)  
✅ **Secure Storage**: Images stored safely on your server  
✅ **Fast Loading**: Images served directly from your backend  

## Technical Details

### Backend Changes
- **New Controller**: `ImageUploadController.java`
  - `POST /api/upload/image` - Upload image
  - `GET /api/upload/images/{filename}` - Serve image
  - `DELETE /api/upload/images/{filename}` - Delete image

- **Storage Location**: `uploads/` directory (created automatically)
- **File Size Limit**: 5MB per image
- **Supported Formats**: All image types (JPG, PNG, GIF, WebP, etc.)

### Frontend Changes
- **File Upload Button**: Added to admin panel
- **Image Preview**: Shows uploaded image before saving
- **Automatic URL**: Uploaded image URL automatically set

### Security
- Image uploads allowed without authentication for simplicity
- File type validation (only images)
- File size validation (max 5MB)
- Files stored with unique UUIDs to prevent conflicts

## Environment Variables

For production deployment, you can customize:

```bash
# Upload directory (default: uploads)
UPLOAD_DIR=/path/to/uploads

# Already configured in application.properties:
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
```

## Deployment Notes

### Railway Deployment
When deploying to Railway, the `uploads/` directory will be created automatically. However, **uploaded files will be deleted when the container restarts** because Railway uses ephemeral storage.

**Solutions**:
1. **Use Cloud Storage** (Recommended for production):
   - Amazon S3
   - Google Cloud Storage
   - Cloudinary (easiest - has free tier)
   
2. **Use GitHub Raw URLs** (Current approach):
   - Upload images to your repository
   - Use raw GitHub URLs
   - Images persist forever

3. **Use Image Hosting Services**:
   - Imgur
   - imgbb
   - ImageKit

### For Persistent Storage (Optional Enhancement)
If you want uploads to persist on Railway, you would need to integrate cloud storage like S3 or Cloudinary. Let me know if you need help with that!

## Testing Locally

1. Start backend: `cd Backend && mvn spring-boot:run`
2. Open admin panel: `http://localhost:3000/admin`
3. Upload an image
4. Check `Backend/uploads/` folder - your image is there!
5. View image directly: `http://localhost:8080/api/upload/images/{filename}`

## Troubleshooting

**Image doesn't upload:**
- Check file size (must be < 5MB)
- Check file type (must be an image)
- Check console for error messages

**Image doesn't display:**
- Make sure you clicked "Save Changes"
- Check browser console for errors
- Verify image URL in database

**Images disappear after deployment:**
- This is normal on Railway (ephemeral storage)
- Use GitHub raw URLs or cloud storage for production

## Example Usage

```javascript
// The upload endpoint returns:
{
  "url": "/api/upload/images/550e8400-e29b-41d4-a716-446655440000.jpg",
  "filename": "550e8400-e29b-41d4-a716-446655440000.jpg"
}

// Full image URL will be:
// http://localhost:8080/api/upload/images/550e8400-e29b-41d4-a716-446655440000.jpg
```

## What's Next?

For production, I recommend:
1. Integrate Cloudinary (free tier is generous)
2. Or continue using GitHub raw URLs (works great!)
3. Set SQL_INIT_MODE=never in Railway (prevent data loss)

---

**Now you can upload ANY image you want! 🎉**
