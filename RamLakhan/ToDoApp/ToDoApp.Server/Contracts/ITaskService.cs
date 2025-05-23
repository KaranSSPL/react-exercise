using ToDoApp.Server.Models;
using ToDoApp.Server.Models.Entity;

namespace ToDoApp.Server.Contracts;

public interface ITaskService
{
    /// <summary>
    /// Get all task 
    /// </summary>
    /// <returns>return response <see cref="ResponseModel"/></returns>
    Task<ResponseModel> GetAllTaskAsync();

    /// <summary>
    /// Get task by id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<ResponseModel> GetTaskByIdAsync(int id);

    /// <summary>
    /// Add of update a task
    /// </summary>
    /// <param name="task"></param>
    /// <returns></returns>
    Task<ResponseModel> AddOrUpdateTaskAsync(Models.Entity.Task task);

    /// <summary>
    /// delete a task
    /// </summary>
    /// <param name="task"></param>
    /// <returns></returns>
    Task<ResponseModel> DeleteAsync(int id);

    /// <summary>
    /// Retrieves all tasks associated with the specified group ID.
    /// </summary>
    /// <remarks>Use this method to fetch tasks for a specific group. The returned <see
    /// cref="ResponseModel"/> may include additional metadata  about the operation, such as success status or error
    /// details.</remarks>
    /// <param name="groupId">The unique identifier of the group whose tasks are to be retrieved. Must be a positive integer.</param>
    /// <returns>A <see cref="Task{TResult}"/> representing the asynchronous operation.  The result contains a <see
    /// cref="ResponseModel"/> object that includes the list of tasks associated with the group ID.</returns>
    Task<ResponseModel> GetAllTaskByGroupId(int groupId);

    /// <summary>
    /// Retrieves all task groups along with their associated tasks.
    /// </summary>
    /// <returns></returns>
    Task<ResponseModel> GetAllGroupWithTaskListAsync();

    /// <summary>
    /// update task for starred task
    /// </summary>
    /// <returns></returns>
    Task<ResponseModel> ToggleStarTaskAsync(int taskId);

    /// <summary>
    /// Get all starred task async
    /// </summary>
    /// <returns></returns>
    Task<ResponseModel> GetStarredTaskAsync();

    /// <summary>
    /// delete all completed task of a spacific group
    /// </summary>
    /// <param name="groupId"></param>
    /// <returns></returns>
    Task<ResponseModel> DeleteCompletedTaskAsync(int groupId);

    /// <summary>
    /// move task to a new group
    /// </summary>
    /// <param name="taskId"></param>
    /// <param name="group"></param>
    /// <returns></returns>
    Task<ResponseModel> MoveTaskToNewList(int taskId, TaskGroup group);
}
